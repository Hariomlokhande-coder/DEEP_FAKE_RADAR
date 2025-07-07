# combine_features_labels.py

import os
import numpy as np
from sklearn.model_selection import train_test_split

# ==============================================
# Paths to your saved .npy files
real_features_path = "E:/DeepFakeRadar/data/deepfake_video_features_augmented/real_features.npy"
fake_features_path = "E:/DeepFakeRadar/data/deepfake_video_features_augmented/fake_features.npy"

real_labels_path = "E:/DeepFakeRadar/data/deepfake_video_labels_augmented/real_labels.npy"
fake_labels_path = "E:/DeepFakeRadar/data/deepfake_video_labels_augmented/fake_labels.npy"

# ==============================================
# Load features and labels
print("📥 Loading real and fake features + labels...")
real_features = np.load(real_features_path)
fake_features = np.load(fake_features_path)

real_labels = np.load(real_labels_path)
fake_labels = np.load(fake_labels_path)

# ==============================================
# Combine them into X (features) and y (labels)
print("🔗 Combining data...")
X = np.concatenate((real_features, fake_features), axis=0)
y = np.concatenate((real_labels, fake_labels), axis=0)

print(f"✅ Combined dataset shape: X={X.shape}, y={y.shape}")
print(f"🔢 Class distribution: Real={np.sum(y==0)}, Fake={np.sum(y==1)}")

# ==============================================
# Split into train/test sets with stratification
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y, shuffle=True
)

print(f"📊 Train set: X={X_train.shape}, y={y_train.shape}")
print(f"📊 Test set: X={X_test.shape}, y={y_test.shape}")

# ==============================================
# Ensure output directory exists
output_dir = "E:/DeepFakeRadar/data"
os.makedirs(output_dir, exist_ok=True)

# ==============================================
# Save combined train-test splits for model training later
np.save(os.path.join(output_dir, "X_train.npy"), X_train)
np.save(os.path.join(output_dir, "X_test.npy"), X_test)
np.save(os.path.join(output_dir, "y_train.npy"), y_train)
np.save(os.path.join(output_dir, "y_test.npy"), y_test)

print("💾 Train-test splits saved successfully.")