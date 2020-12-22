import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Media, Form, Button } from 'react-bootstrap';
import PostCard from '../components/PostCard';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getPostDetails } from '../actions/postActions';
import {
  listCommentsByPost,
  createComment,
  deleteComment,
} from '../actions/commentActions';
import { COMMENT_CREATE_RESET } from '../constants/commentConstants';

const PostScreen = ({ match }) => {
  const [text, setText] = useState('');

  const { postId } = match.params;
  const dispatch = useDispatch();

  const postDetails = useSelector((state) => state.postDetails);
  const { loading, post, error } = postDetails;

  const commentListByPost = useSelector((state) => state.commentListByPost);
  const {
    loading: loadingComment,
    comments,
    error: errorComment,
  } = commentListByPost;

  const commentCreate = useSelector((state) => state.commentCreate);
  const { comment } = commentCreate;

  const commentDelete = useSelector((state) => state.commentDelete);
  const { success, error: errorDeleteComment } = commentDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const {
    loading: userLoginLoading,
    userInfo,
    error: userLoginError,
  } = userLogin;

  const postLike = useSelector((state) => state.postLike);
  const { success: likeSuccess } = postLike;

  const postUnlike = useSelector((state) => state.postUnlike);
  const { success: unlikeSuccess } = postUnlike;

  useEffect(() => {
    dispatch({ type: COMMENT_CREATE_RESET });
    dispatch(getPostDetails(postId));
    dispatch(listCommentsByPost(postId));
  }, [dispatch, comment, success, postId, likeSuccess, unlikeSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createComment(postId, text));
    setText('');
  };

  const deleteHandler = (commentId) => {
    dispatch(deleteComment(postId, commentId));
  };

  return (
    <>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      <Col md={8} className='mr-auto ml-auto p-0'>
        <Row>
          {userLoginLoading && <Loader />}
          {userLoginError && <Message>{userLoginError}</Message>}
          <PostCard post={post} userInfo={userInfo} postId={postId} />
        </Row>
        {loadingComment && <Loader />}
        {errorComment && <Message>{errorComment}</Message>}
        <Row>
          <Col
            style={{
              border: '1px solid rgba(0,0,0,.125)',
              borderRadius: '.4rem',
            }}
            className='mt-1'>
            <h4 className='mt-1'>Comments</h4>
            {comments.length ? (
              <>
                {errorDeleteComment && <Message>{errorDeleteComment}</Message>}
                {comments.map((comment) => (
                  <>
                    <ul key={comment._id} className='list-unstyled'>
                      <Media as='li'>
                        <img
                          width={32}
                          height={32}
                          className='rounded-circle ml-1 mr-1 mt-2'
                          src='https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg'
                          alt='Generic placeholder'
                        />
                        <Media.Body className='mt-2'>
                          <p>{comment.text}</p>
                          {userInfo._id === comment.user.id && (
                            <Button
                              variant='outline-danger'
                              className='btn-sm'
                              onClick={() => deleteHandler(comment._id)}>
                              <i className='far fa-trash-alt'></i>
                            </Button>
                          )}
                        </Media.Body>
                      </Media>
                    </ul>
                  </>
                ))}
              </>
            ) : (
              <p> This photo hasn't received any comments yet</p>
            )}
          </Col>
        </Row>
        <Row>
          <Col
            style={{
              border: '1px solid rgba(0,0,0,.125)',
              borderRadius: '.4rem',
            }}
            className='mt-1'>
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Row>
                  <Col>
                    <Form.Control
                      className='mt-2'
                      size='sm'
                      type='text'
                      placeholder='Add a comment...'
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Button type='submit' className='mt-2' size='sm'>
                      Post
                    </Button>
                  </Col>
                </Form.Row>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default PostScreen;
