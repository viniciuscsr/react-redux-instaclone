import React, { useEffect } from 'react';
import { Row, Col, Card, Button, CardColumns, Image } from 'react-bootstrap';
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
    <Row className='justify-content-md-center'>
      <Col md={10}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <>
            <Row className='my-5'>
              <Col md={4}>
                <img
                  src='/images/no-photo.png'
                  alt={`${user.name}-profile`}
                  className='rounded-circle border border-primary border-4'
                  height='150rem'
                />
              </Col>
              <Col md={8}>
                <Row className='my-3'>
                  <h2 className='mr-2'>{user.name}</h2>
                  {userId !== userInfo._id &&
                    (user.followers && user.followers.includes(userInfo._id) ? (
                      <>
                        <Button
                          className='mr-2 btn btn-sm'
                          onClick={() => followHandler()}
                          variant='primary'
                          size='sm'
                          disabled>
                          Following
                        </Button>
                        <Button
                          onClick={() => unfollowHandler()}
                          variant='primary'
                          size='sm'>
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
                <Row className='my-3 justify-content-md-left'>
                  <Col md={3}>
                    <p className='details-text'>
                      <strong>{user.posts.length}</strong> posts
                    </p>
                  </Col>
                  <Col md={3}>
                    <p className='details-text'>
                      <strong>{user.following.length}</strong> following
                    </p>
                  </Col>
                  <Col md={3}>
                    <p className='details-text'>
                      <strong>{user.followers.length}</strong> followers
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <CardColumns>
              {user.posts &&
                user.posts.map((post) => (
                  <Card style={{ width: '18rem' }}>
                    <LinkContainer key={post._id} to={`/post/${post._id}`}>
                      <Card.Img
                        variant='top'
                        // style={{ maxHeight: '4rem', cursor: 'pointer' }}
                        src={post.image}
                        alt={post.title}
                      />
                    </LinkContainer>
                  </Card>
                ))}
            </CardColumns>
          </>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
