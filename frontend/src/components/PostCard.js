import React from 'react';
import { Col, Row, Card } from 'react-bootstrap';

const PostCard = ({ post }) => {
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
              <strong>User Profile Link</strong> on{' '}
              {post.date.$date.substring(0, 10)}
            </p>
          </div>
          <Row>
            <Card.Img variant='top' src={post.image} />
            <Card.Body>
              <Card.Text>
                <i className='far fa-heart'></i>
                {'  '}
                <i className='far fa-comments'></i>
                {'  '}
                <strong>{post.title}</strong>
                <p>{post.caption}</p>
              </Card.Text>
            </Card.Body>
          </Row>
        </div>
      </Col>
    </Card>
  );
};

export default PostCard;
