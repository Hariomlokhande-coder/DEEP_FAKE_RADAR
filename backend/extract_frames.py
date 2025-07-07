import os
import cv2
from tqdm import tqdm

# Paths
dataset_dir = "E:/DeepFakeRadar/data/deepfake_video_dataset_balanced"
output_dir = "E:/DeepFakeRadar/data/deepfake_video_frames"

# Create output folder if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Frame extraction settings
frame_interval = 10  # extract every 10th frame

# Allowed video extensions
allowed_ext = ('.mp4', '.avi', '.mov')

# Process real and fake folders
for label in ["real", "fake"]:
    input_folder = os.path.join(dataset_dir, label)
    output_folder = os.path.join(output_dir, label)
    os.makedirs(output_folder, exist_ok=True)

    videos = [f for f in os.listdir(input_folder) if f.lower().endswith(allowed_ext)]

    print(f"📂 Found {len(videos)} {label} videos. Starting extraction...")

    for idx, video_file in enumerate(tqdm(videos, desc=f"Processing {label}"), 1):
        try:
            video_path = os.path.join(input_folder, video_file)
            video_name = os.path.splitext(video_file)[0]
            cap = cv2.VideoCapture(video_path)

            if not cap.isOpened():
                print(f"❌ Failed to open {video_file}. Skipping.")
                continue

            frame_count = 0
            saved_count = 0

            while True:
                ret, frame = cap.read()
                if not ret:
                    break
                if frame_count % frame_interval == 0:
                    frame_filename = f"{video_name}_frame{frame_count}.jpg"
                    frame_path = os.path.join(output_folder, frame_filename)
                    cv2.imwrite(frame_path, frame)
                    saved_count += 1
                frame_count += 1

            cap.release()
            print(f"✅ [{label}] {idx}/{len(videos)} Processed {video_file} | Frames saved: {saved_count}")

        except Exception as e:
            print(f"❌ Error processing {video_file}: {e}")

print("\n🎯 Frame extraction completed successfully.")