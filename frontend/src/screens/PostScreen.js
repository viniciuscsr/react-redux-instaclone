import React from 'react';
import { posts } from '../posts';
import { Col, Row } from 'react-bootstrap';
import PostCard from '../components/PostCard';

const PostScreen = ({ match }) => {
  const post = posts.find((p) => p._id === match.params.id);

  return (
    <>
      <Col md={8} className='mr-auto ml-auto'>
        <Row>
          <PostCard post={post} />
        </Row>
      </Col>
    </>
  );
};

export default PostScreen;
