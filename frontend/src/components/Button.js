"use client"

const Button = ({ children, onClick, disabled, className = "", variant = "default", ...props }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`modern-btn ${variant === "outline" ? "btn-outline" : "btn-primary"} ${className}`}
    {...props}
  >
    {children}
  </button>
)

export default Button
