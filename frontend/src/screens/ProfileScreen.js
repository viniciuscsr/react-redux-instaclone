import React, { useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../actions/userActions';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, user, error } = userProfile;

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <h1>{user.name}</h1>
          {user.posts.map((post, index) => (
            <Card key={index}>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </>
  );
};

export default ProfileScreen;
