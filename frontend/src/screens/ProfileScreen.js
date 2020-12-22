import React, { useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../actions/userActions';

const ProfileScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const { userId } = match.params;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, user, error } = userProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getUserProfile(userId));
    }
  }, [dispatch, userInfo, history, userId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Col sm={12} md={12} lg={12} xl={12}>
          <Row>
            <h2 className='mr-auto ml-auto'>{user.name}</h2>
          </Row>
          {user.posts &&
            user.posts.map((post) => (
              <Row>
                <Col key={post._id}>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant='top' src={'/' + post.image} />
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>{post.caption}</Card.Text>
                      <LinkContainer to={`/post/${post._id}`}>
                        <Button variant='primary'>View Post</Button>
                      </LinkContainer>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))}
        </Col>
      )}
    </>
  );
};

export default ProfileScreen;
