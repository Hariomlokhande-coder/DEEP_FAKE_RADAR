import Icon from "./Icon"

const InfoSection = () => {
  const infoItems = [
    {
      icon: "shield",
      title: "Secure & Private",
      description: "Your files are processed securely and never stored on our servers.",
    },
    {
      icon: "zap",
      title: "Fast Analysis",
      description: "Get results in under 30 seconds with our advanced AI algorithms.",
    },
    {
      icon: "brain",
      title: "AI Powered",
      description: "State-of-the-art neural networks trained on millions of samples.",
    },
  ]

  return (
    <section className="info-section">
      <div className="info-grid">
        {infoItems.map((item, index) => (
          <div key={index} className="info-card">
            <Icon name={item.icon} size={24} className="info-icon" />
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default InfoSection
