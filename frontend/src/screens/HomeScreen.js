import React from 'react';
import { Jumbotron, Button, Card, CardGroup } from 'react-bootstrap';

const HomeScreen = () => {
  return (
    <div>
      <Jumbotron>
        <h1>Hello, world!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <p>
          <Button variant='primary'>Learn more</Button>
        </p>
      </Jumbotron>
      <CardGroup>
        <Card>
          <Card.Img variant='top' src='holder.js/100px160' />
          <Card.Body>
            <Card.Title>Post Photos</Card.Title>
            <Card.Text>
              Your photos will come up on your profile and on your friends'
              newsfeed.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant='top' src='holder.js/100px160' />
          <Card.Body>
            <Card.Title>Leave Comments</Card.Title>
            <Card.Text>Leave comments on photos.</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant='top' src='holder.js/100px160' />
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
