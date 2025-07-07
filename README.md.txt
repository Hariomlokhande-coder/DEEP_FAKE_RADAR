# DeepFakeRadar 

DeepFakeRadar is a robust *Deep Learning-based system* to detect deepfake *audio and video* using a modern Flask backend and React frontend.

---

# Features--

✅ Audio DeepFake detection (MFCC + Conv1D)  
✅ Video DeepFake detection (EfficientNetB0 + Dense classifier)  
✅ Real-time prediction APIs  
✅ Clean, intuitive React frontend  
✅ Supports multiple audio/video formats

---

# Project Structure---

DeepFakeRadar/
├── backend/
│   ├── app.py
│   ├── audio_model_final.keras
│   ├── video_deepfake_model_final.h5
│   ├── requirements.txt
│   └── README.md
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json

---

# Setup Instructions--

*1. Clone the repository*

 ```bash
 git clone https://github.com/Hariomlokhande-coder/DeepFakeRadar.git
 cd DeepFakeRadar

2. Setup and Activate virtual environment(backend)

 cd backend
 python -m venv venv
 venv\Scripts\activate  # For Windows
 # Or source venv/bin/activate for Mac/Linux
-------------------------------------------------------------------------------------------------------------------------------------------

3.Install backend requirements
 
 pip install -r requirenments.txt
-------------------------------------------------------------------------------------------------------------------------------------------

4.Install frontend dependencies
 
 cd ../frontend
 npm install
--------------------------------------------------------------------------------------------------------------------------------------------

RUN THE APPLICATION-----
..Start backend API--

   cd backend
   python app.py(It will run backend)
---------------------------------------------------------------------------------------------------------------------------------------------

..Start React frontend
  
  cd frontend
  npm start(It will open the browser and run frontend)
--------------------------------------------------------------------------------------------------------------------------------------------

🔬 Model Training Overview

Audio Detection--
  DATASET LINK -https://www.kaggle.com/datasets/mohammedabdeldayem/the-fake-or-real-dataset
  Trained 1.50 lakh realworld dataset.
  Uses MFCC feature extraction.
  Conv1D model trained on real vs fake audio samples.

Video Detection--
  DATASET LINK-- https://www.kaggle.com/datasets/sanikatiwarekar/deep-fake-detection-dfd-entire-original-dataset
  Uses EfficientNetB0 for frame-level feature extraction.
  Dense classifier predicts real vs fake.

For training scripts, refer to:
  train_audio_model.py
  train_video_model.py
-------------------------------------------------------------------------------------------------------------------------------------------
Future Improvements---
 	
  Enable real-time audio and video stream detection.
  Integrate advanced audio models like Wav2Vec 2.0 or ECAPA-TDNN.
  Store user uploads and results in a database with secure authentication.
  Deploy on cloud platforms with GPU support and scalable architecture.
  Add user accounts and dashboards to track results.
  Implement explainable AI to show why predictions are fake or real.
  Support multiple languages and diverse deepfake datasets.
-------------------------------------------------------------------------------------------------------------------------------------------

Future Scope
 
This project can be expanded by integrating advanced video and audio models to improve detection accuracy. Real-time deepfake detection
for live calls, streaming, and media broadcasting can be implemented. It can be used by media houses to verify videos before publishing.
Adding user accounts with secure databases will help track usage and results. Cloud deployment with GPU support will make it scalable 
for production. Explainable AI techniques can provide insights into model predictions. Improving the UI/UX and supporting multiple languages 
will make the system more accessible and user-friendly.
------------------------------------------------------------------------------------------------------------------------------------------

Author-----

This DeepFake Detection project was developed by Hariom Lokhande as a part of Deep Dive Learning Hackathon organized by METTLE.
