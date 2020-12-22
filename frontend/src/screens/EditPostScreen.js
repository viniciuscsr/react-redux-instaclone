import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { editPost, getPostDetails } from '../actions/postActions';
import { POST_EDIT_RESET } from '../constants/postConstants';

const CreatePostScreen = ({ match, history }) => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');

  const { postId } = match.params;

  const dispatch = useDispatch();

  const postEdit = useSelector((state) => state.postEdit);
  const { loading: postEditLoading, success, error: postEditError } = postEdit;

  const postDetails = useSelector((state) => state.postDetails);
  const { loading, post, error } = postDetails;

  useEffect(() => {
    if (success) {
      dispatch({ type: POST_EDIT_RESET });
      history.push(`/post/${postId}`);
    } else if (!post && !post.title) {
      dispatch(getPostDetails(postId));
    } else {
      setTitle(post.title);
      setCaption(post.caption);
    }
  }, [post, history, dispatch, postId, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editPost(postId, { title, caption }));
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1>Edit Post</h1>
          {error || (postEditError && <Message>{error}</Message>)}
          {loading || (postEditLoading && <Loader />)}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='title'>
              <Form.Label>Post Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Post Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='caption'>
              <Form.Label>Enter the Caption </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter caption'
                value={caption}
                onChange={(e) => setCaption(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePostScreen;
