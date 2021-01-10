import React, { useEffect } from 'react';
import { Col, Row, Card, Button, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost, deletePost } from '../actions/postActions';
import date from 'date-and-time';

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

  return (
    <Card>
      <Col>
        <div className='container post-container p-3'>
          <div className='p-0 pb-3'>
            {post.user.name && (
              <>
                <LinkContainer to={`/user/${post.user._id}`}>
                  <a href={`/user/${post.user._id}`}>{post.user.name} </a>
                </LinkContainer>
                <p id='card-username-date' className='mr-auto'>
                  {' '}
                  on {post.createdAt}
                </p>
              </>
            )}
          </div>
          <Row>
            <Card.Img
              variant='top'
              style={{ maxHeight: '30rem' }}
              src={post.image}
            />
            <Card.Body>
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

                <Card.Text>
                  <strong className='py-1'>{post.title}</strong>
                </Card.Text>
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
              <Card.Text>{post.caption}</Card.Text>
              {button && (
                <LinkContainer to={`/post/${post._id}`}>
                  <Button variant='primary'>View Post</Button>
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
