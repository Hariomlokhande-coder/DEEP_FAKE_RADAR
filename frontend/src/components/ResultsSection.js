"use client"
import { Card, CardHeader, CardTitle, CardContent } from "./Card"
import { Alert, AlertDescription } from "./Alert"
import Button from "./Button"
import Progress from "./Progress"
import Icon from "./Icon"

const ResultsSection = ({ result, confidence, onReset }) => {
  const confidenceValue = !isNaN(Number.parseFloat(confidence)) ? Number.parseFloat(confidence) * 100 : 0

  return (
    <section className="results-section">
      <Card className="results-card">
        <CardHeader>
          <CardTitle>
            <div className="results-title">
              <Icon name={result === "Real" ? "check" : "x"} size={28} className="result-icon" />
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
                <Icon name="trending" size={20} />
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
                <Icon name="warning" size={20} className="alert-icon" />
                <AlertDescription>
                  <strong>Important:</strong> This content may be artificially generated. Please verify the source
                  before sharing or making decisions based on this content.
                </AlertDescription>
              </div>
            </Alert>
          )}

          <div className="action-buttons">
            <Button onClick={onReset} className="primary-action">
              <Icon name="sparkles" size={18} />
              Analyze Another File
            </Button>
            <Button variant="outline" className="secondary-action bg-transparent">
              <Icon name="trending" size={18} />
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default ResultsSection
