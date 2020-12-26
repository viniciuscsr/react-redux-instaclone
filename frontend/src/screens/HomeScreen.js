import React from 'react';
import { Jumbotron, Button, Card, CardGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const HomeScreen = () => {
  return (
    <div>
      <Jumbotron>
        <h1>Insta Clone</h1>
        <p>
          InstaClone is a simplified version of Instagram where users can post
          pictures, leave comments and follow friends.
        </p>
        <p>
          <LinkContainer to='/register'>
            <Button variant='primary'>Get Started</Button>
          </LinkContainer>
        </p>
      </Jumbotron>
      <CardGroup>
        <Card>
          <Card.Img
            variant='top'
            src='/images/post_photos.jpg'
            style={{ maxHeight: '15rem' }}
          />
          <Card.Body>
            <Card.Title>Post Photos</Card.Title>
            <Card.Text>
              Your photos will come up on your profile and on your friends'
              newsfeed.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img
            variant='top'
            src='/images/leave_comments.jpg'
            style={{ maxHeight: '15rem' }}
          />
          <Card.Body>
            <Card.Title>Leave Comments</Card.Title>
            <Card.Text>Leave comments on photos.</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img
            variant='top'
            src='/images/follow.jpg'
            style={{ maxHeight: '15rem' }}
          />
          <Card.Body>
            <Card.Title>Follow your friends</Card.Title>
            <Card.Text>
              Follow your friends and get updates on your newsfeed.
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
};

export default HomeScreen;
