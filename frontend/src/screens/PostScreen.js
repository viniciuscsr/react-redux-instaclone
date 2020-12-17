import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import PostCard from '../components/PostCard';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getPostDetails } from '../actions/postActions';

const PostScreen = ({ match }) => {
  const dispatch = useDispatch();

  const postDetails = useSelector((state) => state.postDetails);
  const { loading, post, error } = postDetails;

  useEffect(() => {
    dispatch(getPostDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      {error && <Message>{error}</Message>}
      {loading && <Loader />}
      <Col md={8} className='mr-auto ml-auto'>
        <Row>
          <PostCard post={post} />
        </Row>
      </Col>
    </>
  );
};

export default PostScreen;
