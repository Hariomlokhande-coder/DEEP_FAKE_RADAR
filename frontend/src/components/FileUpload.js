"use client"
import Button from "./Button"
import Badge from "./Badge"
import Icon from "./Icon"

const FileUpload = ({
  type,
  file,
  dragOver,
  loading,
  onFileChange,
  onDragOver,
  onDragLeave,
  onDrop,
  onUpload,
  formatFileSize,
}) => {
  const isAudio = type === "audio"
  const fileTypes = isAudio ? "MP3, WAV, AAC" : "MP4, AVI, MOV"
  const maxSize = isAudio ? "100MB" : "500MB"
  const title = isAudio ? "Audio Analysis" : "Video Analysis"
  const subtitle = isAudio ? "Detect AI-generated voices and speech" : "Detect deepfake videos and face swaps"
  const iconName = isAudio ? "audio" : "video"

  return (
    <div className={`detection-card ${type}-card`}>
      <div className="modern-card-header">
        <div className="modern-card-title">
          <div className="card-title-wrapper">
            <div className="card-icon-wrapper">
              <Icon name={iconName} size={28} className="card-icon" />
            </div>
            <div className="title-content">
              <h3 className="card-main-title">{title}</h3>
              <p className="card-subtitle">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="modern-card-content">
        <div
          className={`upload-zone ${dragOver ? "drag-active" : ""}`}
          onDragOver={(e) => onDragOver(e, type)}
          onDragLeave={(e) => onDragLeave(e, type)}
          onDrop={(e) => onDrop(e, type)}
        >
          <div className="upload-content">
            <div className="upload-icon-wrapper">
              <Icon name="folder" size={40} className="upload-main-icon" />
            </div>
            <div className="upload-text">
              <h4 className="upload-title">
                {dragOver ? `Drop your ${type} file here` : `Choose ${title.split(" ")[0]} File`}
              </h4>
              <p className="upload-subtitle">
                Drag & drop or click to browse
                <br />
                <span className="file-formats">
                  Supports: {fileTypes} (Max {maxSize})
                </span>
              </p>
            </div>
            <Button
              onClick={() => document.getElementById(`${type}-upload`)?.click()}
              disabled={loading}
              className="upload-button"
            >
              <Icon name="upload" size={18} />
              Browse Files
            </Button>
            <input
              id={`${type}-upload`}
              type="file"
              accept={`${type}/*`}
              onChange={onFileChange}
              style={{ display: "none" }}
            />
          </div>
        </div>

        {file && (
          <div className="selected-file">
            <div className="file-info">
              <Icon name={iconName} size={24} className="file-icon" />
              <div className="file-details">
                <p className="file-name">{file.name}</p>
                <p className="file-meta">
                  {formatFileSize(file.size)} • {file.type.split("/")[1].toUpperCase()}
                </p>
              </div>
            </div>
            <Badge className="ready-badge">✓ Ready</Badge>
          </div>
        )}

        <Button onClick={() => onUpload(file, type)} disabled={!file || loading} className="analyze-button">
          {loading ? (
            <>
              <div className="loading-spinner"></div>
              Analyzing {title.split(" ")[0]}...
            </>
          ) : (
            <>
              <Icon name="zap" size={18} />
              Start {title}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default FileUpload
