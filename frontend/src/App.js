"use client"

import { useState } from "react"
import axios from "axios"
import "./App.css"

// Enhanced component replacements
const Button = ({ children, onClick, disabled, className = "", variant = "default" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`modern-btn ${variant === "outline" ? "btn-outline" : "btn-primary"} ${className}`}
  >
    {children}
  </button>
)

const Card = ({ children, className = "" }) => <div className={`modern-card ${className}`}>{children}</div>
const CardHeader = ({ children }) => <div className="modern-card-header">{children}</div>
const CardTitle = ({ children }) => <div className="modern-card-title">{children}</div>
const CardDescription = ({ children }) => <div className="modern-card-description">{children}</div>
const CardContent = ({ children }) => <div className="modern-card-content">{children}</div>

const Progress = ({ value, className = "" }) => (
  <div className={`modern-progress ${className}`}>
    <div className="modern-progress-bar" style={{ width: `${value}%` }}></div>
  </div>
)

const Badge = ({ children, className = "" }) => <span className={`modern-badge ${className}`}>{children}</span>
const Alert = ({ children, className = "" }) => <div className={`modern-alert ${className}`}>{children}</div>
const AlertDescription = ({ children }) => <div className="modern-alert-description">{children}</div>

const Switch = ({ checked, onCheckedChange }) => (
  <label className="modern-switch">
    <input type="checkbox" checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} />
    <span className="modern-slider"></span>
  </label>
)

// Modern SVG Icons
const ModernIcon = ({ name, size = 24, className = "" }) => {
  const iconStyle = { width: size, height: size }

  switch (name) {
    case "shield":
      return (
        <svg
          style={iconStyle}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    case "upload":
      return (
        <svg
          style={iconStyle}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17,8 12,3 7,8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      )
    case "audio":
      return (
        <svg
          style={iconStyle}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )
    case "video":
      return (
        <svg
          style={iconStyle}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      )
    case "check":
      return (
        <svg
          style={iconStyle}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="20,6 9,17 4,12" />
        </svg>
      )
    case "x":
      return (
        <svg
          style={iconStyle}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      )
    case "zap":
      return (
        <svg
          style={iconStyle}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
        </svg>
      )
    case "sun":
      return (
        <svg
          style={iconStyle}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )
    case "moon":
      return (
        <svg
          style={iconStyle}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )
    case "brain":
      return (
        <svg
          style={iconStyle}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
        </svg>
      )
    case "mic":
      return (
        <svg
          style={iconStyle}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      )
    case "eye":
      return (
        <svg
          style={iconStyle}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    case "play":
      return (
        <svg
          style={iconStyle}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="5,3 19,12 5,21 5,3" />
        </svg>
      )
    case "waves":
      return (
        <svg
          style={iconStyle}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        </svg>
      )
    case "trending":
      return (
        <svg
          style={iconStyle}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
          <polyline points="17,6 23,6 23,12" />
        </svg>
      )
    case "sparkles":
      return (
        <svg
          style={iconStyle}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
          <path d="M20 3v4" />
          <path d="M22 5h-4" />
          <path d="M4 17v2" />
          <path d="M5 18H3" />
        </svg>
      )
    case "warning":
      return (
        <svg
          style={iconStyle}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      )
    case "info":
      return (
        <svg
          style={iconStyle}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      )
    case "folder":
      return (
        <svg
          style={iconStyle}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      )
    default:
      return (
        <div style={iconStyle} className={className}>
          ?
        </div>
      )
  }
}

function App() {
  const [audioFile, setAudioFile] = useState(null)
  const [videoFile, setVideoFile] = useState(null)
  const [result, setResult] = useState("")
  const [confidence, setConfidence] = useState("")
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState("")
  const [darkMode, setDarkMode] = useState(true)
  const [dragOver, setDragOver] = useState({ audio: false, video: false })

  const handleAudioChange = (e) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file)
      setResult("")
      setConfidence("")
    } else {
      setSnackbar("Please upload a valid audio file.")
      setTimeout(() => setSnackbar(""), 3000)
    }
  }

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file)
      setResult("")
      setConfidence("")
    } else {
      setSnackbar("Please upload a valid video file.")
      setTimeout(() => setSnackbar(""), 3000)
    }
  }

  const handleDragOver = (e, type) => {
    e.preventDefault()
    setDragOver((prev) => ({ ...prev, [type]: true }))
  }

  const handleDragLeave = (e, type) => {
    e.preventDefault()
    setDragOver((prev) => ({ ...prev, [type]: false }))
  }

  const handleDrop = (e, type) => {
    e.preventDefault()
    setDragOver((prev) => ({ ...prev, [type]: false }))

    const files = e.dataTransfer.files
    const file = files[0]

    if (type === "audio" && file?.type.startsWith("audio/")) {
      setAudioFile(file)
      setResult("")
      setConfidence("")
    } else if (type === "video" && file?.type.startsWith("video/")) {
      setVideoFile(file)
      setResult("")
      setConfidence("")
    } else {
      setSnackbar(`Please upload a valid ${type} file.`)
      setTimeout(() => setSnackbar(""), 3000)
    }
  }

  const handleUpload = async (file, type) => {
    if (!file) {
      setSnackbar(`No ${type} file selected.`)
      setTimeout(() => setSnackbar(""), 3000)
      return
    }

    const formData = new FormData()
    formData.append(type, file)
    setLoading(true)
    setResult("")
    setConfidence("")

    try {
      const isLocal = window.location.hostname === "localhost";
      const endpoint = isLocal
        ? `http://127.0.0.1:5000/predict/${type}`
        : `https://stellar-upliftment-production-3034.up.railway.app/predict/${type}`;
      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
      })

      if (response && response.data) {
        const { prediction, confidence } = response.data
        if (prediction && confidence !== undefined) {
          setResult(prediction)
          setConfidence(confidence)
          setSnackbar(`${type === "audio" ? "Audio" : "Video"} detection completed.`)
          setTimeout(() => setSnackbar(""), 3000)
        } else {
          setResult("Error")
          setConfidence("Invalid response from server.")
        }
      } else {
        setResult("Error")
        setConfidence("No data in response.")
      }
    } catch (error) {
      console.error("Prediction failed:", error)
      if (error.code === "ECONNABORTED") {
        setSnackbar("Request timed out. Try again.")
      } else if (error.response) {
        setSnackbar(`Server Error: ${error.response.statusText}`)
      } else {
        setSnackbar("Prediction failed. Check your backend connection.")
      }
      setResult("Error")
      setConfidence("Something went wrong.")
      setTimeout(() => setSnackbar(""), 3000)
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const confidenceValue = !isNaN(Number.parseFloat(confidence)) ? Number.parseFloat(confidence) * 100 : 0

  return (
    <div className={`modern-app ${darkMode ? "dark" : "light"}`}>
      {/* Animated Background */}
      <div className="modern-background">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
      </div>

      <div className="modern-container">
        {/* Header */}
        <header className="modern-header">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon">
                <ModernIcon name="shield" size={28} className="shield-icon" />
              </div>
              <div className="title-group">
                <h1 className="app-title">DeepFake Radar</h1>
                <p className="app-tagline">Ensuring Authenticity with AI</p>
              </div>
            </div>

            <div className="theme-controls">
              <div className="theme-switch">
                <ModernIcon name="sun" size={16} className="theme-icon" />
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                <ModernIcon name="moon" size={16} className="theme-icon" />
              </div>
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-content">
            <h2 className="welcome-title">Welcome to DeepFake Detection</h2>
            <p className="welcome-description">
              Upload your audio or video files below and our AI will analyze them for authenticity. The process is
              secure, fast, and accurate.
            </p>
            <div className="welcome-steps">
              <div className="step">
                <div className="step-number">1</div>
                <span>Choose your file</span>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <span>Click analyze</span>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <span>Get results</span>
              </div>
            </div>
          </div>
        </section>

        {/* Detection Section */}
        <section className="detection-section">
          <div className="detection-grid">
            {/* Audio Detection */}
            <Card className="detection-card audio-card">
              <CardHeader>
                <CardTitle>
                  <div className="card-title-wrapper">
                    <div className="card-icon-wrapper">
                      <ModernIcon name="audio" size={28} className="card-icon" />
                    </div>
                    <div className="title-content">
                      <h3 className="card-main-title">Audio Analysis</h3>
                      <p className="card-subtitle">Detect AI-generated voices and speech</p>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div
                  className={`upload-zone ${dragOver.audio ? "drag-active" : ""}`}
                  onDragOver={(e) => handleDragOver(e, "audio")}
                  onDragLeave={(e) => handleDragLeave(e, "audio")}
                  onDrop={(e) => handleDrop(e, "audio")}
                >
                  <div className="upload-content">
                    <div className="upload-icon-wrapper">
                      <ModernIcon name="folder" size={40} className="upload-main-icon" />
                    </div>
                    <div className="upload-text">
                      <h4 className="upload-title">
                        {dragOver.audio ? "Drop your audio file here" : "Choose Audio File"}
                      </h4>
                      <p className="upload-subtitle">
                        Drag & drop or click to browse
                        <br />
                        <span className="file-formats">Supports: MP3, WAV, AAC (Max 100MB)</span>
                      </p>
                    </div>
                    <Button
                      onClick={() => document.getElementById("audio-upload")?.click()}
                      disabled={loading}
                      className="upload-button"
                    >
                      <ModernIcon name="upload" size={18} />
                      Browse Files
                    </Button>
                    <input
                      id="audio-upload"
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                {audioFile && (
                  <div className="selected-file">
                    <div className="file-info">
                      <ModernIcon name="audio" size={24} className="file-icon" />
                      <div className="file-details">
                        <p className="file-name">{audioFile.name}</p>
                        <p className="file-meta">
                          {formatFileSize(audioFile.size)} • {audioFile.type.split("/")[1].toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <Badge className="ready-badge">✓ Ready</Badge>
                  </div>
                )}

                <Button
                  onClick={() => handleUpload(audioFile, "audio")}
                  disabled={!audioFile || loading}
                  className="analyze-button"
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Analyzing Audio...
                    </>
                  ) : (
                    <>
                      <ModernIcon name="zap" size={18} />
                      Start Audio Analysis
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Video Detection */}
            <Card className="detection-card video-card">
              <CardHeader>
                <CardTitle>
                  <div className="card-title-wrapper">
                    <div className="card-icon-wrapper">
                      <ModernIcon name="video" size={28} className="card-icon" />
                    </div>
                    <div className="title-content">
                      <h3 className="card-main-title">Video Analysis</h3>
                      <p className="card-subtitle">Detect deepfake videos and face swaps</p>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div
                  className={`upload-zone ${dragOver.video ? "drag-active" : ""}`}
                  onDragOver={(e) => handleDragOver(e, "video")}
                  onDragLeave={(e) => handleDragLeave(e, "video")}
                  onDrop={(e) => handleDrop(e, "video")}
                >
                  <div className="upload-content">
                    <div className="upload-icon-wrapper">
                      <ModernIcon name="folder" size={40} className="upload-main-icon" />
                    </div>
                    <div className="upload-text">
                      <h4 className="upload-title">
                        {dragOver.video ? "Drop your video file here" : "Choose Video File"}
                      </h4>
                      <p className="upload-subtitle">
                        Drag & drop or click to browse
                        <br />
                        <span className="file-formats">Supports: MP4, AVI, MOV (Max 500MB)</span>
                      </p>
                    </div>
                    <Button
                      onClick={() => document.getElementById("video-upload")?.click()}
                      disabled={loading}
                      className="upload-button"
                    >
                      <ModernIcon name="upload" size={18} />
                      Browse Files
                    </Button>
                    <input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                {videoFile && (
                  <div className="selected-file">
                    <div className="file-info">
                      <ModernIcon name="video" size={24} className="file-icon" />
                      <div className="file-details">
                        <p className="file-name">{videoFile.name}</p>
                        <p className="file-meta">
                          {formatFileSize(videoFile.size)} • {videoFile.type.split("/")[1].toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <Badge className="ready-badge">✓ Ready</Badge>
                  </div>
                )}

                <Button
                  onClick={() => handleUpload(videoFile, "video")}
                  disabled={!videoFile || loading}
                  className="analyze-button"
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Analyzing Video...
                    </>
                  ) : (
                    <>
                      <ModernIcon name="zap" size={18} />
                      Start Video Analysis
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Results Section */}
        {result && (
          <section className="results-section">
            <Card className="results-card">
              <CardHeader>
                <CardTitle>
                  <div className="results-title">
                    <ModernIcon name={result === "Real" ? "check" : "x"} size={28} className="result-icon" />
                    <span>Analysis Complete</span>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="main-result">
                  <div className={`result-status ${result === "Real" ? "authentic" : "deepfake"}`}>
                    <div className="result-badge">{result === "Real" ? "✓ AUTHENTIC" : "⚠ DEEPFAKE DETECTED"}</div>
                    <div className="result-text">
                      {result === "Real" ? "Content appears genuine" : "AI-generated content detected"}
                    </div>
                  </div>
                </div>

                <div className="confidence-section">
                  <div className="confidence-header">
                    <div className="confidence-label">
                      <ModernIcon name="trending" size={20} />
                      <span>Confidence Level</span>
                    </div>
                    <span className="confidence-value">
                      {!isNaN(Number.parseFloat(confidence))
                        ? `${(Number.parseFloat(confidence) * 100).toFixed(1)}%`
                        : confidence}
                    </span>
                  </div>

                  {!isNaN(Number.parseFloat(confidence)) && (
                    <div className="progress-wrapper">
                      <Progress value={confidenceValue} />
                      <div className="progress-labels">
                        <span>Low</span>
                        <span>High</span>
                      </div>
                    </div>
                  )}
                </div>

                {result !== "Real" && result !== "Error" && (
                  <Alert className="security-alert">
                    <div className="alert-content">
                      <ModernIcon name="warning" size={20} className="alert-icon" />
                      <AlertDescription>
                        <strong>Important:</strong> This content may be artificially generated. Please verify the source
                        before sharing or making decisions based on this content.
                      </AlertDescription>
                    </div>
                  </Alert>
                )}

                <div className="action-buttons">
                  <Button
                    onClick={() => {
                      setAudioFile(null)
                      setVideoFile(null)
                      setResult("")
                      setConfidence("")
                    }}
                    className="primary-action"
                  >
                    <ModernIcon name="sparkles" size={18} />
                    Analyze Another File
                  </Button>
                  <Button variant="outline" className="secondary-action bg-transparent">
                    <ModernIcon name="trending" size={18} />
                    Download Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Info Section */}
        <section className="info-section">
          <div className="info-grid">
            <div className="info-card">
              <ModernIcon name="shield" size={24} className="info-icon" />
              <h4>Secure & Private</h4>
              <p>Your files are processed securely and never stored on our servers.</p>
            </div>
            <div className="info-card">
              <ModernIcon name="zap" size={24} className="info-icon" />
              <h4>Fast Analysis</h4>
              <p>Get results in under 30 seconds with our advanced AI algorithms.</p>
            </div>
            <div className="info-card">
              <ModernIcon name="brain" size={24} className="info-icon" />
              <h4>AI Powered</h4>
              <p>State-of-the-art neural networks trained on millions of samples.</p>
            </div>
          </div>
        </section>

        {/* Notification */}
        {snackbar && (
          <div className="notification-wrapper">
            <Alert className="notification-alert">
              <div className="notification-content">
                <ModernIcon name="info" size={20} />
                <AlertDescription>{snackbar}</AlertDescription>
              </div>
            </Alert>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
