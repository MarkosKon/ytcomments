import React, { Component } from "react";
import { Grid, Row, Col, ProgressBar } from "react-bootstrap";
import ReactGA from "react-ga";

import Search from "./Search";
import Video from "./Video";
import Comments from "./Comments";
import SearchComments from "./SearchComments";
import AlertDismissable from "./AlertDismissable";

class App extends Component {
  constructor(props) {
    super(props);

    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      searchUrl: null,
      videoData: null,
      totalComments: 0,
      commentData: [],
      filteredCommentData: [],
      searchTerm: null,
      alertVisible: false,
      progressBarVisible: false,
      progressBarNow: 0
    };
    // we need that because we fetch
    // the comments in chunks.
    this.comments = [];
    this.prevId = null;
  }

  componentDidMount() {
    if (process.env.NODE_ENV === "production") {
      ReactGA.initialize(process.env.REACT_APP_GA);
      ReactGA.pageview("/");
    }
    this.getData("https://www.youtube.com/watch?v=8f0LZAihqZI");
  }

  getData(url) {
    const videoId = this.getVideoIdFromUrl(url);
    this.fetchVideoData(videoId);
    this.fetchComments(videoId);
    this.setState({ searchUrl: url });
  }

  handleChange({ filtered, searchTerm }) {
    this.setState({
      filteredCommentData: filtered,
      searchTerm
    });
  }

  getVideoIdFromUrl(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  }

  fetchVideoData(videoId) {
    if (videoId && videoId !== this.prevId) {
      const target = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${
        process.env.REACT_APP_YT_KEY
      }`;
      fetch(target)
        .then(response => response.json())
        .then(data =>
          this.setState({
            videoData: data,
            totalComments: data.items[0].statistics.commentCount
          })
        )
        .catch(err => console.log(err));
    }
  }

  fetchComments(videoId, pageToken) {
    if (videoId && videoId !== this.prevId) {
      const target = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${
        process.env.REACT_APP_YT_KEY
      }&maxResults=100${pageToken ? "&pageToken=" + pageToken : ""}`;
      this.setState({ alertVisible: false, progressBarVisible: true });
      fetch(target)
        .then(response => response.json())
        .then(data => {
          this.comments = this.comments.concat(data.items);
          this.setState({
            commentData: this.comments,
            filteredCommentData: this.comments,
            progressBarNow:
              (this.comments.length / (this.state.totalComments / 2)) * 100
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
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    const {
      alertVisible,
      videoData,
      progressBarVisible,
      progressBarNow,
      commentData,
      filteredCommentData,
      searchTerm
    } = this.state;
    return (
      <>
        <Grid fluid={true} className="main-container">
          {alertVisible && <AlertDismissable message="Comments loaded!" />}
          <Row className="show-grid">
            <Col md={6} mdOffset={3}>
              <h1 className="page-header app-title">
                Get the posts for a youtube video
              </h1>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col md={6} mdOffset={3}>
              <Search listener={this.getData} />
              {videoData && <Video videoData={videoData} />}
              {progressBarVisible && (
                <ProgressBar now={progressBarNow} active />
              )}
            </Col>
          </Row>
        </Grid>
        <Grid fluid={true} className="comment-container">
          {filteredCommentData && (
            <>
              <SearchComments
                commentData={commentData}
                handleChange={this.handleChange}
              />
              <Comments
                commentData={filteredCommentData}
                searchTerm={searchTerm}
              />
            </>
          )}
        </Grid>
      </>
    );
  }
}

export default App;
