import React from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../posts';
import { Col, Row, Image } from 'react-bootstrap';

const PostScreen = ({ match }) => {
  const post = posts.find((p) => p._id === match.params.id);

  return (
    <>
      <Col md={12}>
        <Row>
          <Image src={post.image} alt={post.name} fluid />
        </Row>
        <Row></Row>
      </Col>
    </>
  );
};

export default PostScreen;
