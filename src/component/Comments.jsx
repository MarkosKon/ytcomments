import React from "react";
import { Row, Col } from "react-bootstrap";
import { DynamicSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import memoize from "memoize-one";

import Comment from "./Comment";

const createItemData = memoize((commentData, searchTerm) => ({ commentData, searchTerm }));

const Comments = ({ commentData, searchTerm }) => {
  const itemData = createItemData(commentData, searchTerm);
  return (
    <Row className="show-grid" style={{ backgroundColor: "ghostwhite" }}>
      <Col md={8} mdOffset={2} className="lead comment-count" />
      <Col md={8} mdOffset={2} id="content" style={{ minHeight: "100vh" }}>
        <AutoSizer defaultWidth={1920} defaultHeight={1080}>
          {({ width, height }) => {
            return (
              <List
                height={height}
                itemCount={commentData.length}
                width={width}
                itemData={itemData}
              >
                {Comment}
              </List>
            );
          }}
        </AutoSizer>
      </Col>
      <div id="delay" />
    </Row>
  );
};

export default Comments;
