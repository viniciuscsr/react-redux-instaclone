import React, { useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listPosts } from '../actions/postActions';

const NewsFeed = () => {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postList);
  const { loading, posts, error } = postList;

  useEffect(() => {
    dispatch(listPosts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Col md={8} className='mr-auto ml-auto'>
          <Row>
            {posts.map((post) => (
              <Container className='mt-2 mb-2' key={post._id}>
                <PostCard post={post} button profileLink />
              </Container>
            ))}
          </Row>
        </Col>
      )}
    </>
  );
};

export default NewsFeed;
