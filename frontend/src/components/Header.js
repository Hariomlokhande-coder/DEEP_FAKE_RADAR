import Icon from "./Icon"
import Switch from "./Switch"

const Header = ({ darkMode, onThemeChange }) => {
  return (
    <header className="modern-header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">
            <Icon name="shield" size={28} className="shield-icon" />
          </div>
          <div className="title-group">
            <h1 className="app-title">DeepFake Radar</h1>
            <p className="app-tagline">Ensuring Authenticity with AI</p>
          </div>
        </div>

        <div className="theme-controls">
          <div className="theme-switch">
            <Icon name="sun" size={16} className="theme-icon" />
            <Switch checked={darkMode} onCheckedChange={onThemeChange} />
            <Icon name="moon" size={16} className="theme-icon" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
