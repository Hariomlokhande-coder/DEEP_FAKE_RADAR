const Progress = ({ value, className = "" }) => (
  <div className={`modern-progress ${className}`}>
    <div className="modern-progress-bar" style={{ width: `${value}%` }}></div>
  </div>
)

export default Progress
