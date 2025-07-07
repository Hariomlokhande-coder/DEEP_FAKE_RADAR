## train_video_model.py

import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models, callbacks, optimizers
from sklearn.utils.class_weight import compute_class_weight
from sklearn.metrics import classification_report

# ==============================================
# Load data
X_train = np.load("E:/DeepFakeRadar/data/X_train.npy")
X_test = np.load("E:/DeepFakeRadar/data/X_test.npy")
y_train = np.load("E:/DeepFakeRadar/data/y_train.npy")
y_test = np.load("E:/DeepFakeRadar/data/y_test.npy")

print(f"✅ Data loaded | X_train: {X_train.shape}, X_test: {X_test.shape}")

# ==============================================
# Compute class weights
class_weights_array = compute_class_weight(class_weight="balanced", classes=np.unique(y_train), y=y_train)
class_weights = dict(enumerate(class_weights_array))
print(f"⚖ Class weights: {class_weights}")

# ==============================================
# Build model function (with deployment ready structure)
def build_model(input_dim, learning_rate=1e-4, dropout_rates=[0.4,0.3,0.2]):
    model = models.Sequential([
        layers.Input(shape=(input_dim,)),
        layers.Dense(512, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(dropout_rates[0]),

        layers.Dense(256, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(dropout_rates[1]),

        layers.Dense(64, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(dropout_rates[2]),

        layers.Dense(1, activation='sigmoid')
    ])
    model.compile(optimizer=optimizers.Adam(learning_rate=learning_rate),
                  loss='binary_crossentropy',
                  metrics=['accuracy'])
    return model

# ==============================================
# Callbacks for robust training
checkpoint_cb = callbacks.ModelCheckpoint("video_model_best.h5", save_best_only=True, monitor="val_loss")
earlystop_cb = callbacks.EarlyStopping(patience=5, restore_best_weights=True)

# ==============================================
# Hyperparameter tuning placeholder (for Optuna integration later)
# def objective(trial):
#     learning_rate = trial.suggest_loguniform('learning_rate', 1e-5, 1e-3)
#     dropout1 = trial.suggest_uniform('dropout1', 0.3, 0.5)
#     dropout2 = trial.suggest_uniform('dropout2', 0.2, 0.4)
#     dropout3 = trial.suggest_uniform('dropout3', 0.1, 0.3)
#     model = build_model(X_train.shape[1], learning_rate, [dropout1, dropout2, dropout3])
#     ...
#     return val_loss

# ==============================================
# Train final model
model = build_model(X_train.shape[1])

history = model.fit(
    X_train, y_train,
    epochs=20,
    batch_size=32,
    validation_split=0.2,
    callbacks=[checkpoint_cb, earlystop_cb],
    class_weight=class_weights
)

# ==============================================
# Evaluate on test set
print("\n🔍 Evaluating on test set...")
model.load_weights("video_model_best.h5")
y_pred = (model.predict(X_test) > 0.5).astype("int32")
print(classification_report(y_test, y_pred, target_names=["Real", "Fake"]))

# ==============================================
# Save final model for deployment
model.save("video_deepfake_model_final.h5")
print("💾 Final model saved as video_deepfake_model_final.h5")