import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

class Title extends Component {
  render() {
    return (
      <Row className="show-grid">
        <Col md={6} mdOffset={3}>
          <h1 className="page-header app-title">
            Get the posts for a youtube video
          </h1>
        </Col>
      </Row>
    );
  }
}

export default Title;
