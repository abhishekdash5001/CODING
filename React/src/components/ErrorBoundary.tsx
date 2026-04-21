import React from "react";

class ErrorBoundary extends React.Component {
  // they are used to catch run time errors
  // they will not catch set timeout setinterval prmise eror or event hanler error

  /**
     * 
     *child crashes
        ↓
        getDerivedStateFromError()
        ↓
        state updates
        ↓
        fallback UI renders
        ↓
        componentDidCatch()
     * 
     * 
     */
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) { //static is used bcz react need this functin wthout the istnace  this should be pure function
    // update state so fallback UI renders
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Caught by Error Boundary:", error);
    console.log("Error info:", errorInfo);
    // send error to logging service
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
