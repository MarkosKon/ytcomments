import React, { Component } from "react";
import Reply from "./Reply";
import LazyLoad from "react-lazyload";

class Comment extends Component {
  render() {
    const comment = this.props.comment;
    const index = this.props.index;
    const commentsNumber = this.props.commentsNumber;
    const date = new Date(
      comment.snippet.topLevelComment.snippet.publishedAt
    ).toLocaleString();
    return (
      <LazyLoad height={200} offset={600}>
        <div key={index} className="panel panel-default">
          <div className="panel-body">
            <div className="row">
              <span className="cr-count">
                Comment #: {commentsNumber - index}
              </span>
              <div className="col-md-1 col-sm-2 col-xs-3 img-wrapper">
                <img
                  className="img-circle img-responsive img-user-avatar"
                  src={
                    comment.snippet.topLevelComment.snippet
                      .authorProfileImageUrl
                  }
                  alt="..."
                />
              </div>
              <div className="col-md-11 col-sm-10 col-xs-9 user-info">
                <h3>
                  <a
                    href={
                      comment.snippet.topLevelComment.snippet.authorChannelUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                  </a>
                </h3>
                <p className="text-muted">
                  Date published:
                  {date}
                </p>
              </div>
            </div>
            <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
            {comment.snippet.totalReplyCount !== 0 ? (
              <Reply comment={comment} />
            ) : null}
          </div>
        </div>
      </LazyLoad>
    );
  }
}

export default Comment;
