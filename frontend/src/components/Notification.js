import { Alert, AlertDescription } from "./Alert"
import Icon from "./Icon"

const Notification = ({ message, onClose }) => {
  if (!message) return null

  return (
    <div className="notification-wrapper">
      <Alert className="notification-alert">
        <div className="notification-content">
          <Icon name="info" size={20} />
          <AlertDescription>{message}</AlertDescription>
        </div>
      </Alert>
    </div>
  )
}

export default Notification
