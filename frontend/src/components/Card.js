export const Card = ({ children, className = "" }) => <div className={`modern-card ${className}`}>{children}</div>

export const CardHeader = ({ children }) => <div className="modern-card-header">{children}</div>

export const CardTitle = ({ children }) => <div className="modern-card-title">{children}</div>

export const CardDescription = ({ children }) => <div className="modern-card-description">{children}</div>

export const CardContent = ({ children }) => <div className="modern-card-content">{children}</div>
