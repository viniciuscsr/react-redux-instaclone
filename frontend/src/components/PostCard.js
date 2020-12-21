import React from 'react';
import { Col, Row, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const PostCard = ({ post, button }) => {
  return (
    <Card>
      <Col>
        <div className='container post-container p-3'>
          <div className='p-0 pb-3'>
            <img
              src='https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg'
              className='rounded-circle mr-3'
              height='50px'
              width='50px'
              alt='avatar'
            />
            <p id='card-username-date'>
              <strong>User Profile Link</strong> on {post.createdAt}
            </p>
          </div>
          <Row>
            <Card.Img variant='top' src={'/' + post.image} />
            <Card.Body>
              <Card.Text>
                <i className='far fa-heart'></i>
                {'  '}
                <i className='far fa-comments'></i>
                {'  '}
                <strong>{post.title}</strong>
                <br />
                {post.caption}
              </Card.Text>
              {button && (
                <LinkContainer to={`/post/${post._id}`}>
                  <Button variant='primary'>View Post</Button>
                </LinkContainer>
              )}
            </Card.Body>
          </Row>
        </div>
      </Col>
    </Card>
  );
};

export default PostCard;
