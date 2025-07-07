"use client"

const Switch = ({ checked, onCheckedChange }) => (
  <label className="modern-switch">
    <input type="checkbox" checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} />
    <span className="modern-slider"></span>
  </label>
)

export default Switch
