import React, { Component } from "react";
import { Grid, Row, Col, ProgressBar } from "react-bootstrap";
import Title from "./Title";
import Search from "./Search";
import Video from "./Video";
import Comments from "./Comments";
import AlertDismissable from "./AlertDismissable";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.state = {
      searchUrl: null,
      videoData: null,
      totalComments: 0,
      commentData: [],
      alertVisible: false,
      progressBarVisible: false,
      progressBarNow: 0
    };
    this.comments = [];
    this.prevId = null;
  }

  componentDidMount() {
    window.addEventListener("load", () => {
      const url = "https://www.youtube.com/watch?v=8f0LZAihqZI";
      const videoId = this.getVideoIdFromUrl(url);
      this.fetchVideoData(videoId);
      this.fetchComments(videoId);
      this.setState({ searchUrl: url });
    });
  }

  render() {
    return (
      <Grid fluid={true} className="main-container">
        {this.state.alertVisible ? (
          <AlertDismissable message="Comments loaded!" />
        ) : null}
        <Title />
        <Row className="show-grid">
          <Col md={6} mdOffset={3}>
            <Search listener={this.handleSearchInput} />
            {this.state.videoData ? (
              <Video videoData={this.state.videoData} />
            ) : null}
            {this.state.progressBarVisible ? (
              <ProgressBar now={this.state.progressBarNow} active />
            ) : null}
          </Col>
        </Row>
        {this.state.commentData && this.state.commentData.length > 0 ? (
          <Comments commentData={this.state.commentData} />
        ) : (
          <span />
        )}
      </Grid>
    );
  }

  getVideoIdFromUrl(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  }

  handleSearchInput(url) {
    const videoId = this.getVideoIdFromUrl(url);
    this.fetchVideoData(videoId);
    this.fetchComments(videoId);
    this.setState({ searchUrl: url });
  }

  fetchVideoData(videoId) {
    if (videoId && videoId !== this.prevId) {
      const target = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=YOUR_KEY`;
      fetch(target)
        .then(response => response.json())
        .then(data =>
          this.setState({
            videoData: data,
            totalComments: data.items[0].statistics.commentCount
          })
        )
        .catch(function(error) {});
    }
  }

  fetchComments(videoId, pageToken) {
    if (videoId && videoId !== this.prevId) {
      const target = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=YOUR_KEY${
        pageToken ? "&pageToken=" + pageToken : ""
      }`;
      this.setState({ alertVisible: false, progressBarVisible: true });
      fetch(target)
        .then(response => response.json())
        .then(data => {
          data.items.forEach(element => {
            this.comments.push(element);
          });
          this.setState({
            commentData: this.comments,
            progressBarNow:
              this.comments.length / (this.state.totalComments / 2) * 100
          });
          if (data.nextPageToken != null) {
            this.fetchComments(videoId, data.nextPageToken);
          } else {
            this.prevId = videoId;
            this.comments = [];
            this.setState({
              alertVisible: true,
              progressBarVisible: false,
              progressBarNow: 0
            });
          }
        });
    }
  }
}

export default App;
