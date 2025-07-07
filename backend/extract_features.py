import os
import numpy as np
import cv2
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tqdm import tqdm
# ========== CONFIGURATION ==========
# Paths
dataset_dir = "E:/DeepFakeRadar/data/deepfake_video_frames"
output_feature_dir = "E:/DeepFakeRadar/data/deepfake_video_features"

# Create output directory if not exist
os.makedirs(output_feature_dir, exist_ok=True) 

# Load MobileNetV2 model (without top layer for feature extraction)
base_model = MobileNetV2(weights="imagenet", include_top=False, pooling="avg")
print("✅ MobileNetV2 loaded for feature extraction.")

# ========== PROCESS EACH CLASS ==========
for label in ["real", "fake"]:
    input_folder = os.path.join(dataset_dir, label)
    output_file_features = os.path.join(output_feature_dir, f"{label}_features.npy")
    output_file_labels = os.path.join(output_feature_dir, f"{label}_labels.npy")

    # Store features and labels
    features = []
    output_labels = []

    # List images
    images = [f for f in os.listdir(input_folder) if f.lower().endswith(".jpg")]
    print(f"\n📂 Extracting features from {len(images)} '{label}' frames...")

    # Process each image
    for img_file in tqdm(images, desc=f"Processing {label}"):
        img_path = os.path.join(input_folder, img_file)

        # Read and preprocess image
        img = cv2.imread(img_path)
        if img is None:
            print(f"⚠ Skipping unreadable image: {img_path}")
            continue

        img = cv2.resize(img, (224, 224))
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = preprocess_input(img)
        img = np.expand_dims(img, axis=0)

        # Extract features
        feat = base_model.predict(img, verbose=0)
        features.append(feat.flatten())
        output_labels.append(0 if label == "real" else 1)

    # Convert to numpy arrays
    features = np.array(features)
    labels = np.array(output_labels)

    # Save features and labels
    np.save(output_file_features, features)
    np.save(output_file_labels, labels)

    print(f"✅ Saved {label} features to {output_file_features} | Shape: {features.shape}")
    print(f"✅ Saved {label} labels to {output_file_labels} | Shape: {labels.shape}")

print("\n🎯 Feature extraction completed successfully.")