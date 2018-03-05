import React, { Component } from "react";

class Reply extends Component {
  constructor(props) {
    super(props);

    this.state = {
      replies: [],
      buttonOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    const comment = this.props.comment;
    return (
      <div>
        <button
          id={comment.id}
          className="btn btn-primary btn-lg showReplies"
          data-toggle="button"
          aria-pressed="false"
          autoComplete="off"
          onClick={this.handleClick}
        >
          <span className="replay-btn-text">
            {this.state.buttonOpen ? "Hide replies" : "Show replies"}
          </span>
          <span>({comment.snippet.totalReplyCount})</span>
        </button>
        <div id={"content" + comment.id} className="col-md-12 replay-parent">
          {this.state.replies.length > 0 && this.state.buttonOpen === true
            ? this.state.replies.map((reply, index, replies) => {
                const date = new Date(
                  reply.snippet.publishedAt
                ).toLocaleString();
                return (
                  <div key={index} className="panel panel-default">
                    <div className="panel-body">
                      <div className="row">
                        <span className="cr-count">
                          Reply #: {replies.length - index}
                        </span>
                        <div className="col-md-1 col-sm-2 col-xs-3 img-wrapper">
                          <img
                            className="img-circle img-responsive img-user-avatar"
                            src={reply.snippet.authorProfileImageUrl}
                            alt="..."
                          />
                        </div>
                        <div className="col-md-11 col-sm-10 col-xs-9 user-info">
                          <h3>
                            <a
                              href={reply.snippet.authorChannelUrl}
                              target="_blank"
                            >
                              {reply.snippet.authorDisplayName}
                            </a>
                          </h3>
                          <p className="text-muted">Date published: {date}</p>
                        </div>
                      </div>
                      <p>{reply.snippet.textDisplay}</p>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }

  handleClick() {
    if (this.state.replies.length <= 0) {
      const url = `https://www.googleapis.com/youtube/v3/comments?part=snippet&parentId=${
        this.props.comment.id
      }&maxResults=100&key=YOUR_KEY`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.setState({
            replies: data.items
          });
        });
    }
    if (this.state.buttonOpen) {
      this.setState({
        buttonOpen: false
      });
    } else {
      this.setState({
        buttonOpen: true
      });
    }
  }
}

export default Reply;
