import React, { useEffect } from 'react';
import { Col, Row, Card, Button, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost, deletePost } from '../actions/postActions';

const PostCard = ({
  post,
  button,
  userInfo,
  postId,
  history,
  postSettings,
}) => {
  const dispatch = useDispatch();

  const postDelete = useSelector((state) => state.postDelete);
  const { success } = postDelete;

  useEffect(() => {
    if (success) {
      history.goBack();
    }
  }, [success, history]);

  const likePostHandler = () => {
    dispatch(likePost(postId));
  };

  const unlikePostHandler = () => {
    dispatch(unlikePost(postId));
  };

  const deleteHandler = () => {
    if (window.confirm('Are you sure?')) {
      dispatch(deletePost(postId));
    }
  };

  const date = new Date(post.createdAt);
  const formatedDate = date.toDateString().toUpperCase();

  return (
    <Card>
      <Col className='px-0'>
        <div className='container post-container p-3'>
          <Row className='pb-3 mx-2'>
            <img
              src='/images/no-photo.png'
              className='rounded-circle mr-3'
              height='50px'
              width='50px'
              alt='avatar'
            />
            {post.user.name && (
              <LinkContainer to={`/user/${post.user._id}`}>
                <a href={`/user/${post.user._id}`} className='mt-2'>
                  {post.user.name}{' '}
                </a>
              </LinkContainer>
            )}
            {postSettings && userInfo._id === post.user._id && (
              <Dropdown className='ml-auto'>
                <Dropdown.Toggle
                  variant='success'
                  id='dropdown-basic'></Dropdown.Toggle>

                <Dropdown.Menu>
                  <LinkContainer to={`/post/${postId}/edit`}>
                    <Dropdown.Item href={`/post/${postId}/edit`}>
                      Edit
                    </Dropdown.Item>
                  </LinkContainer>
                  <Dropdown.Item onClick={() => deleteHandler()}>
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Row>
          <Row>
            <Card.Img
              variant='top'
              style={{ maxHeight: '30rem' }}
              src={post.image}
            />
            <Card.Body className='pb-0'>
              <Row>
                {post.likes && post.likes.includes(userInfo._id) ? (
                  <Button
                    style={{ border: '0' }}
                    variant='outline-danger'
                    onClick={() => unlikePostHandler()}>
                    <i className='fas fa-heart'></i>
                  </Button>
                ) : (
                  <Button
                    style={{ border: '0' }}
                    variant='outline-danger'
                    onClick={() => likePostHandler()}>
                    <i className='far fa-heart'></i>
                  </Button>
                )}

                <Card.Text className='mt-1'>
                  <strong className='py-1'>{post.title}</strong>
                </Card.Text>
              </Row>
              <Card.Text>{post.caption}</Card.Text>
              <p className='mr-auto mb-0' style={{ fontSize: '12px' }}>
                {formatedDate}
              </p>
              {button && (
                <LinkContainer to={`/post/${post._id}`}>
                  <Button className='mt-2' variant='primary' size='sm' block>
                    View Comments
                  </Button>
                </LinkContainer>
              )}
            </Card.Body>
          </Row>
        </div>
      </Col>
    </Card>
  );
};

export default PostCard;
