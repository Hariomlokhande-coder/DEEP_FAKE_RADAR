"use client"

import { useState } from "react"
import axios from "axios"

export const useFileUpload = () => {
  const [audioFile, setAudioFile] = useState(null)
  const [videoFile, setVideoFile] = useState(null)
  const [result, setResult] = useState("")
  const [confidence, setConfidence] = useState("")
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState("")
  const [dragOver, setDragOver] = useState({ audio: false, video: false })

  const showNotification = (message) => {
    setSnackbar(message)
    setTimeout(() => setSnackbar(""), 3000)
  }

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith(`${type}/`)) {
      if (type === "audio") {
        setAudioFile(file)
      } else {
        setVideoFile(file)
      }
      setResult("")
      setConfidence("")
    } else {
      showNotification(`Please upload a valid ${type} file.`)
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
      showNotification(`Please upload a valid ${type} file.`)
    }
  }

  const handleUpload = async (file, type) => {
    if (!file) {
      showNotification(`No ${type} file selected.`)
      return
    }

    const formData = new FormData()
    formData.append(type, file)
    setLoading(true)
    setResult("")
    setConfidence("")

    try {
      const endpoint = `http://127.0.0.1:5000/predict/${type}`
      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
      })

      if (response && response.data) {
        const { prediction, confidence } = response.data
        if (prediction && confidence !== undefined) {
          setResult(prediction)
          setConfidence(confidence)
          showNotification(`${type === "audio" ? "Audio" : "Video"} detection completed.`)
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
        showNotification("Request timed out. Try again.")
      } else if (error.response) {
        showNotification(`Server Error: ${error.response.statusText}`)
      } else {
        showNotification("Prediction failed. Check your backend connection.")
      }
      setResult("Error")
      setConfidence("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const resetFiles = () => {
    setAudioFile(null)
    setVideoFile(null)
    setResult("")
    setConfidence("")
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return {
    audioFile,
    videoFile,
    result,
    confidence,
    loading,
    snackbar,
    dragOver,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleUpload,
    resetFiles,
    formatFileSize,
  }
}
