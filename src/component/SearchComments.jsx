import React from "react";
import { Row, Col } from "react-bootstrap";

const SearchComments = ({ commentData, handleChange }) => (
  <Row className="show-grid">
    <Col md={6} mdOffset={3}>
      <input
        type="search"
        placeholder="Search comments"
        className="form-control"
        aria-label="search for..."
        onChange={e => {
          const regExp = new RegExp(e.target.value, "gi");
          const filtered = commentData.filter(
            ({
              snippet: {
                topLevelComment: {
                  snippet: { textOriginal }
                }
              }
            }) => textOriginal.match(regExp)
          );
          handleChange({ filtered, searchTerm: e.target.value });
        }}
      />
    </Col>
  </Row>
);

export default SearchComments;
