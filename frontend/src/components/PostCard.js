import React from 'react';
import { Col, Row, Card, Button, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch } from 'react-redux';
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

  const likePostHandler = () => {
    dispatch(likePost(postId));
  };

  const unlikePostHandler = () => {
    dispatch(unlikePost(postId));
  };

  const deleteHandler = () => {
    if (window.confirm('Are you sure?')) {
      dispatch(deletePost(postId));
      history.goBack();
    }
  };

  return (
    <Card>
      <Col>
        <div className='container post-container p-3'>
          <div className='p-0 pb-3'>
            <img
              src='https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg'
              className='rounded-circle mr-3'
              height='50px'
              width='50px'
              alt='avatar'
            />
            <LinkContainer to={`/user/${post.user}`}>
              <a href={`/user/${post.user}`}>Author Name</a>
            </LinkContainer>
            <p id='card-username-date'>
              <strong>User Profile Link</strong> on {post.createdAt}
            </p>
          </div>
          <Row>
            <Card.Img variant='top' src={'/' + post.image} />
            <Card.Body>
              <Card.Text>
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

                  <p>
                    <strong className='py-1'>{post.title}</strong>
                  </p>
                  {postSettings && userInfo._id === post.user && (
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
                  <p>{post.caption}</p>
                </Row>
              </Card.Text>
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
