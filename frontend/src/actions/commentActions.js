import axios from 'axios';
import {
  COMMENT_LIST_BY_POST_REQUEST,
  COMMENT_LIST_BY_POST_SUCCESS,
  COMMENT_LIST_BY_POST_FAIL,
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  COMMENT_CREATE_FAIL,
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
  COMMENT_UPDATE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAIL,
} from '../constants/commentConstants';

export const listCommentsByPost = (postId) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMMENT_LIST_BY_POST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/posts/${postId}/comments`, config);
    dispatch({ type: COMMENT_LIST_BY_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COMMENT_LIST_BY_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createComment = (postId, text) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMMENT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/posts/${postId}/comments`,
      { text: text },
      config
    );
    dispatch({ type: COMMENT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COMMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateComment = (postId, commentId, text) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: COMMENT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/posts/${postId}/comments/${commentId}`,
      text,
      config
    );
    dispatch({ type: COMMENT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COMMENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteComment = (postId, commentId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: COMMENT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/posts/${postId}/comments/${commentId}`, config);
    dispatch({ type: COMMENT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: COMMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
