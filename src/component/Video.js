import React, { Component } from "react";
import { Row } from "react-bootstrap";

class Video extends Component {
  render() {
    return (
      <Row className="video-embed">
        {this.props.videoData ? (
          <div>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                title="Embeded YouTube video"
                className="embed-responsive-item"
                src={
                  "https://www.youtube.com/embed/" +
                  this.props.videoData.items[0].id
                }
                allowFullScreen
              />
            </div>
            <div className="video-info">
              <span id="video-views" className="text-muted">
                {this.props.videoData.items[0].statistics.viewCount}
              </span>
              <span className="social">
                <i className="fa fa-thumbs-o-up" aria-hidden="true" />
                <span id="video-likes">
                  {this.props.videoData.items[0].statistics.likeCount}
                </span>
                <i className="fa fa-thumbs-o-down" aria-hidden="true" />
                <span id="video-dislikes">
                  {this.props.videoData.items[0].statistics.dislikeCount}
                </span>
              </span>
            </div>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </Row>
    );
  }
}

export default Video;
