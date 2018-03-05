import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Comment from "./Comment";

class Comments extends Component {
  render() {
    return (
      <Row className="show-grid">
        <Col md={8} mdOffset={2} className="lead comment-count" />
        <Col md={8} mdOffset={2} id="content">
          {this.props.commentData.map((comment, index, comments) => (
            <Comment
              key={index}
              comment={comment}
              index={index}
              commentsNumber={comments.length}
            />
          ))}
        </Col>
        <div id="delay" />
      </Row>
    );
  }
}

export default Comments;
