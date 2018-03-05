import React, { Component } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.listener = this.props.listener.bind(this);
  }

  handleInputClick(e) {
    e.target.select();
  }

  handleButtonClick(e) {
    const inputValue = document.getElementById("videoId").value;
    this.listener(inputValue);
  }

  render() {
    return (
      <InputGroup>
        <span className="input-group-btn">
          <Button
            bsStyle="primary"
            id="submitBtn"
            name="submitBtn"
            onClick={this.handleButtonClick}
          >
            Search
          </Button>
        </span>
        <FormControl
          id="videoId"
          type="text"
          autoFocus
          onClick={this.handleInputClick}
          placeholder="Paste the url"
          defaultValue="https://www.youtube.com/watch?v=8f0LZAihqZI"
        />
      </InputGroup>
    );
  }
}

export default Search;
