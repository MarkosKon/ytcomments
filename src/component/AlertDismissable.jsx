import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import anime from "animejs";

class AlertDismissable extends Component {
  constructor(props) {
    super(props);

    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);

    this.state = {
      alertVisible: true
    };
  }

  render() {
    const { alertVisible } = this.state;
    return (
      alertVisible && (
        <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
          <p>{this.props.message}</p>
        </Alert>
      )
    );
  }

  componentDidMount() {
    anime
      .timeline()
      .add({
        targets: ".alert",
        translateX: ["-100%", 0],
        delay: 500,
        duration: 2000
      })
      .add({
        targets: ".alert",
        translateX: [0, "120%"],
        delay: 3000,
        duration: 2000,
        complete: anim => this.setState({ alertVisible: false })
      });
  }

  handleAlertDismiss() {
    this.setState({ alertVisible: false });
  }
}

export default AlertDismissable;
