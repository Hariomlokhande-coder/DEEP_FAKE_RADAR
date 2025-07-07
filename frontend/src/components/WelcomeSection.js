const WelcomeSection = () => {
  return (
    <section className="welcome-section">
      <div className="welcome-content">
        <h2 className="welcome-title">Welcome to DeepFake Detection</h2>
        <p className="welcome-description">
          Upload your audio or video files below and our AI will analyze them for authenticity. The process is secure,
          fast, and accurate.
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
  )
}

export default WelcomeSection
