import React from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../posts';
import { Col, Row, Image, Card } from 'react-bootstrap';

const PostScreen = ({ match }) => {
  const post = posts.find((p) => p._id === match.params.id);

  return (
    <>
      <Col md={8}>
        <div class='container post-container p-3 border rounded'>
          <div class='container title-container'>
            <h1>{post.title}</h1>
            <p>By User Profile Link on {post.date.$date.substring(0, 10)}</p>
          </div>
          <Row>
            <Card>
              <Card.Img variant='top' src={post.image} />
              <Card.Body>
                <Card.Text>
                  <i class='far fa-heart'></i> {post.caption}
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default PostScreen;
