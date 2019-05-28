import React from "react";
import { Row } from "react-bootstrap";

const Video = ({ videoData }) => {
  const { id, statistics } = videoData.items[0];
  const { viewCount, likeCount, dislikeCount } = statistics;
  return (
    <Row className="video-embed">
      {videoData ? (
        <>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              title="Embeded YouTube video"
              className="embed-responsive-item"
              src={"https://www.youtube.com/embed/" + id}
              allowFullScreen
            />
          </div>
          <div className="video-info">
            <span id="video-views" className="text-muted">
              {viewCount}
            </span>
            <span className="social">
              <i className="fa fa-thumbs-o-up" aria-hidden="true" />
              <span id="video-likes">{likeCount}</span>
              <i className="fa fa-thumbs-o-down" aria-hidden="true" />
              <span id="video-dislikes">{dislikeCount}</span>
            </span>
          </div>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </Row>
  );
};

export default Video;
