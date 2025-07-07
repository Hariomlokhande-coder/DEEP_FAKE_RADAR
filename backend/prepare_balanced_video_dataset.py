import os
import shutil
import random

# Paths
source_real_dir = "E:/DeepFakeRadar/data/deepfake_video/DFD_original sequences_real"
source_fake_dir = "E:/DeepFakeRadar/data/deepfake_video/DFD_manipulated_sequences_fake"
destination_dir = "E:/DeepFakeRadar/data/deepfake_video_dataset_balanced"

# Create destination folders
real_dest = os.path.join(destination_dir, "real")
fake_dest = os.path.join(destination_dir, "fake")

os.makedirs(real_dest, exist_ok=True)
os.makedirs(fake_dest, exist_ok=True)

# Allowed video extensions
allowed_ext = [".mp4", ".avi", ".mov"]

# Copy real videos
real_files = [f for f in os.listdir(source_real_dir) if os.path.splitext(f)[1].lower() in allowed_ext]

print(f"📂 Found {len(real_files)} real video files.")
for idx, file in enumerate(real_files, 1):
    src_path = os.path.join(source_real_dir, file)
    dest_path = os.path.join(real_dest, file)
    try:
        if not os.path.exists(dest_path):  # avoid duplicate copy
            shutil.copy(src_path, dest_path)
        print(f"✅ Copied real {idx}/{len(real_files)}: {file}")
    except Exception as e:
        print(f"❌ Failed to copy real file {file}. Error: {e}")

# Randomly sample equal number of fake videos
fake_files = [f for f in os.listdir(source_fake_dir) if os.path.splitext(f)[1].lower() in allowed_ext]

print(f"📂 Found {len(fake_files)} fake video files.")
selected_fake_files = random.sample(fake_files, len(real_files))

for idx, file in enumerate(selected_fake_files, 1):
    src_path = os.path.join(source_fake_dir, file)
    dest_path = os.path.join(fake_dest, file)
    try:
        if not os.path.exists(dest_path):
            shutil.copy(src_path, dest_path)
        print(f"✅ Copied fake {idx}/{len(selected_fake_files)}: {file}")
    except Exception as e:
        print(f"❌ Failed to copy fake file {file}. Error: {e}")

print("\n🎯 Dataset preparation completed successfully.")