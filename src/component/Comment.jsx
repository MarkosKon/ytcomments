import React, { forwardRef } from "react";
import Highlighter from "react-highlight-words";

import Reply from "./Reply";

const Comment = forwardRef(
  ({ data: { commentData, searchTerm }, style, index }, ref) => {
    const comment = commentData[index];
    const { totalReplyCount } = comment.snippet;
    const {
      publishedAt,
      authorProfileImageUrl,
      authorChannelUrl,
      authorDisplayName,
      textOriginal
    } = comment.snippet.topLevelComment.snippet;
    const date = new Date(publishedAt).toLocaleString();
    return (
      <div ref={ref} style={{ ...style, overflow: "auto" }}>
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="row">
              <span className="cr-count">
                Comment #: {commentData.length - index}
              </span>
              <div className="col-md-1 col-sm-2 col-xs-3 img-wrapper">
                <img
                  className="img-circle img-responsive img-user-avatar"
                  src={authorProfileImageUrl}
                  alt="..."
                />
              </div>
              <div className="col-md-11 col-sm-10 col-xs-9 user-info">
                <h3>
                  <a
                    href={authorChannelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {authorDisplayName}
                  </a>
                </h3>
                <p className="text-muted">
                  Date published:
                  {date}
                </p>
              </div>
            </div>
            <Highlighter
              highlightClassName="highlight"
              searchWords={[searchTerm]}
              autoEscape={true}
              textToHighlight={textOriginal}
            />
            {totalReplyCount !== 0 && <Reply comment={comment} />}
          </div>
        </div>
      </div>
    );
  }
);

export default Comment;
