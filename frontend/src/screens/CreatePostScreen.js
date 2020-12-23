import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { createPost } from '../actions/postActions';
import { POST_CREATE_RESET } from '../constants/postConstants';

const CreatePostScreen = ({ history }) => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const postCreate = useSelector((state) => state.postCreate);
  const { loading, post, error } = postCreate;

  useEffect(() => {
    if (post && post._id) {
      history.push(`/post/${post._id}`);
      dispatch({ type: POST_CREATE_RESET });
    }
  }, [post, history, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPost({ title, caption, image }));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1>Create New Post</h1>
          {error && <Message>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='title'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Upload Image'
                value={image}
                onChange={(e) => setImage(e.target.value)}></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}></Form.File>
              {uploading && <Loader />}
            </Form.Group>
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
