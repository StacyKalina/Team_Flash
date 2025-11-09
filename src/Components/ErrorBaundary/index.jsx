import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // лог только для девов
    console.error("UI error boundary:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          maxWidth: 680, margin: "48px auto", padding: 24,
          borderRadius: 12, border: "1px solid #eee", textAlign: "center"
        }}>
          <h2 style={{ margin: 0 }}>Etwas ist schiefgelaufen.</h2>
          <p style={{ color: "#666" }}>Bitte versuchen Sie es später erneut.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
