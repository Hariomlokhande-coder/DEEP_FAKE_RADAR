import os
print("Current working directory:", os.getcwd())
import numpy as np
import librosa
import logging
from sklearn.model_selection import train_test_split
from sklearn.utils.class_weight import compute_class_weight
from sklearn.metrics import classification_report
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv1D, MaxPooling1D, Dropout, Flatten, Dense, BatchNormalization, LSTM, GRU
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, CSVLogger

# ===================== LOGGER SETUP =====================
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s - %(message)s',
    handlers=[logging.FileHandler("train_log.log"), logging.StreamHandler()]
)
log = logging.getLogger()

# ===================== CONFIG =====================
DATASET_BASE = r"E:/DeepFakeRadar/data/deepfake_dataset"
SUBSETS = ["for-2sec/for-2seconds", "for-norm/for-norm", "for-original/for-original"]
MODES = ["training", "validation", "testing"]
CATEGORIES = ["real", "fake"]

MAX_PAD_LEN = 174
N_MFCC = 40
SAMPLE_RATE = 22050
EPOCHS = 60
BATCH_SIZE = 32
USE_AUGMENTATION = False
AUGMENTATION_OPTIONS = ['noise', 'pitch', 'stretch']  # Expandable
USE_LSTM = False
USE_GRU = False

# ===================== FUNCTIONS =====================

def augment_audio(audio, sr, augmentations):
    """Apply selected augmentation(s) to audio."""
    if 'noise' in augmentations:
        audio = audio + 0.005 * np.random.randn(len(audio))
    if 'pitch' in augmentations:
        audio = librosa.effects.pitch_shift(audio, sr, n_steps=2)
    if 'stretch' in augmentations:
        audio = librosa.effects.time_stretch(audio, rate=0.8)
    return audio

def extract_features(file_path, augment=False):
    """Extract MFCC features from an audio file, with optional augmentation."""
    try:
        audio, sr = librosa.load(file_path, sr=SAMPLE_RATE)
        if augment:
            audio = augment_audio(audio, sr, AUGMENTATION_OPTIONS)
        mfcc = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=N_MFCC)
        pad_width = MAX_PAD_LEN - mfcc.shape[1]
        if pad_width > 0:
            mfcc = np.pad(mfcc, ((0, 0), (0, pad_width)), mode='constant')
        else:
            mfcc = mfcc[:, :MAX_PAD_LEN]
        return mfcc.T  # Shape: (MAX_PAD_LEN, N_MFCC)
    except Exception as e:
        log.warning(f"Failed to process {file_path}: {e}")
        return None

def load_data():
    """Load dataset and extract features."""
    X, y = [], []
    for subset in SUBSETS:
        for mode in MODES:
            for label, class_name in enumerate(CATEGORIES):
                folder_path = os.path.join(DATASET_BASE, subset, mode, class_name)
                if not os.path.exists(folder_path):
                    continue
                for file in os.listdir(folder_path):
                    if file.lower().endswith(".wav"):
                        full_path = os.path.join(folder_path, file)
                        features = extract_features(full_path, augment=USE_AUGMENTATION)
                        if features is not None:
                            X.append(features)
                            y.append(label)
    return np.array(X), np.array(y)

def build_model(input_shape):
    """Build and compile the model based on configuration."""
    model = Sequential()
    if USE_LSTM:
        model.add(LSTM(128, input_shape=input_shape))
    elif USE_GRU:
        model.add(GRU(128, input_shape=input_shape))
    else:
        model.add(Conv1D(64, 5, activation='relu', input_shape=input_shape))
        model.add(BatchNormalization())
        model.add(MaxPooling1D(2))
        model.add(Dropout(0.3))

        model.add(Conv1D(128, 5, activation='relu'))
        model.add(BatchNormalization())
        model.add(MaxPooling1D(2))
        model.add(Dropout(0.3))

        model.add(Conv1D(256, 5, activation='relu'))
        model.add(BatchNormalization())
        model.add(MaxPooling1D(2))
        model.add(Dropout(0.3))

        model.add(Flatten())

    model.add(Dense(128, activation='relu'))
    model.add(Dropout(0.4))
    model.add(Dense(2, activation='softmax'))

    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    return model

# ===================== MAIN =====================
if __name__ == "__main__":
    log.info(" Loading data...")
    X, y = load_data()
    log.info(f"Total samples loaded: {len(X)} | Real: {np.sum(y==0)} | Fake: {np.sum(y==1)}")

    if len(X) == 0:
        log.error("No data loaded. Check dataset paths.")
        exit()

    # Ensure correct shape: (samples, timesteps, features)
    X = X.reshape((X.shape[0], MAX_PAD_LEN, N_MFCC))

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    class_weights = compute_class_weight(class_weight='balanced', classes=np.unique(y), y=y)
    class_weight_dict = {i: w for i, w in enumerate(class_weights)}

    log.info("Building model...")
    model = build_model((MAX_PAD_LEN, N_MFCC))
    os.makedirs("model", exist_ok=True)

    early_stop = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)
    checkpoint = ModelCheckpoint("model/best_audio_model.keras", monitor="val_accuracy", save_best_only=True)
    csv_logger = CSVLogger("training_log.csv", append=True)

    log.info("Starting training...")
    model.fit(
        X_train, y_train,
        validation_data=(X_test, y_test),
        epochs=EPOCHS,
        batch_size=BATCH_SIZE,
        class_weight=class_weight_dict,
        callbacks=[early_stop, checkpoint, csv_logger]
    )

    log.info("Evaluating model...")
    y_pred = model.predict(X_test)
    y_pred_classes = np.argmax(y_pred, axis=1)
    report = classification_report(y_test, y_pred_classes, target_names=["Real", "Fake"])
    print("\nClassification Report:\n", report)

    model.save("audio_model_final.keras")
    log.info("Final model saved as audio_model_final.keras")
