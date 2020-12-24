import React, { useEffect } from 'react';
import { Row, Col, Card, Button, CardColumns } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserProfile,
  followUser,
  unfollowUser,
} from '../actions/userActions';
import { USER_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const { userId } = match.params;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, user, error } = userProfile;

  const userFollow = useSelector((state) => state.userFollow);
  const { success: followSuccess } = userFollow;

  const userUnfollow = useSelector((state) => state.userUnfollow);
  const { success: unfollowSuccess } = userUnfollow;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch({ type: USER_PROFILE_RESET });
      dispatch(getUserProfile(userId));
    }
  }, [dispatch, userInfo, history, userId, followSuccess, unfollowSuccess]);

  const followHandler = () => {
    dispatch(followUser(userId));
  };

  const unfollowHandler = () => {
    dispatch(unfollowUser(userId));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Col sm={12} md={12} lg={12} xl={12}>
          <Row className='my-2'>
            <h2 className='mr-2'>{user.name}</h2>
            {userId !== userInfo._id &&
              (user.followers && user.followers.includes(userInfo._id) ? (
                <>
                  <Button
                    className='mr-2'
                    onClick={() => followHandler()}
                    size='sm'
                    variant='primary'
                    disabled>
                    Following
                  </Button>
                  <Button
                    onClick={() => unfollowHandler()}
                    size='sm'
                    variant='primary'>
                    Unfollow
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => followHandler()}
                  size='sm'
                  variant='primary'>
                  Follow
                </Button>
              ))}
          </Row>
          <CardColumns>
            {user.posts &&
              user.posts.map((post) => (
                <Card key={post._id} style={{ width: '18rem' }}>
                  <Card.Img
                    variant='top'
                    style={{ maxHeight: '10rem' }}
                    src={post.image}
                  />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.caption}</Card.Text>
                    <LinkContainer to={`/post/${post._id}`}>
                      <Button variant='primary'>View Post</Button>
                    </LinkContainer>
                  </Card.Body>
                </Card>
              ))}
          </CardColumns>
        </Col>
      )}
    </>
  );
};

export default ProfileScreen;
