from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
import os
import uuid
import librosa
import cv2
from pydub import AudioSegment

# ==============================================
# App initialization
app = Flask(__name__)
CORS(app)

# ==============================================
# Constants

# Base directory for absolute paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

AUDIO_MODEL_PATH = os.path.join(BASE_DIR,"audio_model_final.keras")
VIDEO_MODEL_PATH = os.path.join(BASE_DIR,"video_deepfake_model_final.h5")

SAMPLE_RATE = 22050
N_MFCC = 40
MAX_PAD_LEN = 174

# ==============================================
# Load models
print("🔄 Loading models...")
try:
    print("Current Working Directory:", os.getcwd())
    print("Loading audio model from:", AUDIO_MODEL_PATH)
    print("Loading video model from:", VIDEO_MODEL_PATH)

    audio_model = tf.keras.models.load_model(AUDIO_MODEL_PATH)
    video_model = tf.keras.models.load_model(VIDEO_MODEL_PATH)

    # Load EfficientNetB0 for video feature extraction
    feature_extractor = tf.keras.applications.EfficientNetB0(
        include_top=False,
        pooling='avg',
        input_shape=(224,224,3)
    )
    print("✅ Models loaded successfully.")
except Exception as e:
    print(f"❌ Error loading models: {str(e)}")
    exit(1)

# ==============================================
# Audio utilities

def convert_to_wav(input_path, output_path):
    audio = AudioSegment.from_file(input_path)
    audio = audio.set_frame_rate(SAMPLE_RATE).set_channels(1).set_sample_width(2)
    audio.export(output_path, format="wav")

def extract_audio_features(file_path):
    audio, sr = librosa.load(file_path, sr=SAMPLE_RATE)
    mfcc = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=N_MFCC)
    pad_width = MAX_PAD_LEN - mfcc.shape[1]
    if pad_width > 0:
        mfcc = np.pad(mfcc, ((0,0),(0,pad_width)), mode='constant')
    else:
        mfcc = mfcc[:, :MAX_PAD_LEN]
    return mfcc.T.reshape(1, MAX_PAD_LEN, N_MFCC)

# ==============================================
# Video utilities

def extract_video_features(frame):
    frame_resized = cv2.resize(frame, (224,224))
    frame_rgb = cv2.cvtColor(frame_resized, cv2.COLOR_BGR2RGB)
    frame_rgb = frame_rgb.astype(np.float32) / 255.0
    frame_rgb = frame_rgb.reshape(1,224,224,3)

    # Extract feature vector using EfficientNet
    features = feature_extractor.predict(frame_rgb, verbose=0)
    return features

# ==============================================
# Routes

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Hello from DeepFakeRadar backend API!"})

# ==============================================
@app.route("/predict/audio", methods=["POST"])
def predict_audio():
    if "audio" not in request.files:
        return jsonify({"error": "No audio file uploaded"}), 400

    uploaded_file = request.files["audio"]
    raw_temp = f"temp_{uuid.uuid4().hex}"
    converted_temp = f"{raw_temp}.wav"

    try:
        uploaded_file.save(raw_temp)
        convert_to_wav(raw_temp, converted_temp)
        mfcc = extract_audio_features(converted_temp)

        pred = audio_model.predict(mfcc)[0]
        result = "Real" if np.argmax(pred) == 0 else "Fake"
        confidence = round(float(np.max(pred)), 4)

        return jsonify({"prediction": result, "confidence": confidence})

    except Exception as e:
        print(f"❌ Audio prediction error: {str(e)}")
        return jsonify({"error": "Error predicting audio."}), 500

    finally:
        for f in [raw_temp, converted_temp]:
            if os.path.exists(f):
                os.remove(f)

# ==============================================
@app.route("/predict/video", methods=["POST"])
def predict_video():
    if "video" not in request.files:
        return jsonify({"error": "No video file uploaded"}), 400

    uploaded_file = request.files["video"]
    temp_video = f"temp_{uuid.uuid4().hex}.mp4"

    try:
        # Save uploaded video
        uploaded_file.save(temp_video)

        # Open video using cv2
        cap = cv2.VideoCapture(temp_video)
        if not cap.isOpened():
            raise ValueError("Failed to open video.")

        predictions = []
        frame_count = 0
        sample_rate = 10  # process every 10th frame for speed

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            if frame_count % sample_rate == 0:
                feat = extract_video_features(frame)
                pred = video_model.predict(feat, verbose=0)[0][0]
                predictions.append(pred)

            frame_count += 1

        cap.release()

        if not predictions:
            return jsonify({"error": "No frames processed"}), 500

        avg_pred = np.mean(predictions)
        result = "Real" if avg_pred < 0.5 else "Fake"
        confidence = round(float(avg_pred), 4)

        return jsonify({
            "prediction": result,
            "confidence": confidence,
            "frames_processed": len(predictions)
        })

    except Exception as e:
        print(f"❌ Video prediction error: {str(e)}")
        return jsonify({"error": "Error predicting video."}), 500

    finally:
        if os.path.exists(temp_video):
            os.remove(temp_video)

# ==============================================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)