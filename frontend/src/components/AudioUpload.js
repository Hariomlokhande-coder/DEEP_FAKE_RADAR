import React, { useState } from "react";
import { ReactMic } from "react-mic";
import axios from "axios";

const AudioRecorder = () => {
  const [record, setRecord] = useState(false);
  const [blobURL, setBlobURL] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);

  const startRecording = () => setRecord(true);
  const stopRecording = () => setRecord(false);

  const onStop = async (recordedBlob) => {
    setBlobURL(recordedBlob.blobURL);
    setLoading(true);

    const formData = new FormData();
    formData.append("audio", recordedBlob.blob, "recording.wav");

    try {
      const response = await axios.post("http://localhost:5000/predict", formData);
      setPrediction(response.data.prediction);
      setConfidence(response.data.confidence);
    } catch (err) {
      setPrediction("Error");
      setConfidence("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2>🎤 Record and Analyze Audio</h2>
      <ReactMic
        record={record}
        className="sound-wave"
        onStop={onStop}
        strokeColor="#000000"
        backgroundColor="#FF4081"
        mimeType="audio/wav"
      />
      <br />
      <button onClick={startRecording} disabled={record}>Start Recording</button>
      <button onClick={stopRecording} disabled={!record}>Stop Recording</button>

      {blobURL && (
        <div>
          <h4>Preview:</h4>
          <audio controls src={blobURL}></audio>
        </div>
      )}

      {loading && <p>Analyzing...</p>}
      {prediction && (
        <div>
          <h3>Prediction: {prediction}</h3>
          <p>Confidence: {confidence}</p>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;