import requests
import os

url = 'http://127.0.0.1:5000/predict'
folder = 'E:/DeepFakeRadar/backend'  # Change to your folder path

# List all .wav files in the folder
audio_files = [f for f in os.listdir(folder) if f.endswith('.wav')]

for audio_file in audio_files:
    file_path = os.path.join(folder, audio_file)
    with open(file_path, 'rb') as f:
        files = {'audio': f}
        response = requests.post(url, files=files)
        print(f"{audio_file} => {response.json()}")
