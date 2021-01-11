import React, { useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { newsfeedPosts } from '../actions/postActions';

const NewsFeed = () => {
  const dispatch = useDispatch();

  const postNewsfeed = useSelector((state) => state.postNewsfeed);
  const { loading, posts, error } = postNewsfeed;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postLike = useSelector((state) => state.postLike);
  const { success: likeSuccess } = postLike;

  const postUnlike = useSelector((state) => state.postUnlike);
  const { success: unlikeSuccess } = postUnlike;

  useEffect(() => {
    dispatch(newsfeedPosts());
  }, [dispatch, likeSuccess, unlikeSuccess]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : posts.length > 0 ? (
        <Col md={8} className='mr-auto ml-auto'>
          <Row>
            {posts.map((post) => (
              <Container className='mt-2 mb-2' key={post._id}>
                <PostCard
                  post={post}
                  button
                  userInfo={userInfo}
                  postId={post._id}
                />
              </Container>
            ))}
          </Row>
        </Col>
      ) : (
        <h3>
          Use the search bar to find users to follow. Hint: Hit the search
          button to see all users.
        </h3>
      )}
    </>
  );
};

export default NewsFeed;
