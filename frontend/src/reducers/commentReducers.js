import {
  COMMENT_LIST_BY_POST_REQUEST,
  COMMENT_LIST_BY_POST_SUCCESS,
  COMMENT_LIST_BY_POST_FAIL,
  COMMENT_LIST_BY_POST_RESET,
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  COMMENT_CREATE_FAIL,
  COMMENT_CREATE_RESET,
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
  COMMENT_UPDATE_FAIL,
  COMMENT_UPDATE_RESET,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAIL,
  COMMENT_DELETE_RESET,
} from '../constants/commentConstants';

export const commentListByPostReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case COMMENT_LIST_BY_POST_REQUEST:
      return { loading: true, comments: [] };
    case COMMENT_LIST_BY_POST_SUCCESS:
      return { loading: false, comments: action.payload };
    case COMMENT_LIST_BY_POST_FAIL:
      return { loading: false, error: action.payload };
    case COMMENT_LIST_BY_POST_RESET:
      return {};
    default:
      return state;
  }
};

export const commentCreateReducer = (state = { comment: {} }, action) => {
  switch (action.type) {
    case COMMENT_CREATE_REQUEST:
      return { loading: true, comment: [] };
    case COMMENT_CREATE_SUCCESS:
      return { loading: false, comment: action.payload };
    case COMMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COMMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const commentUpdateReducer = (state = { comment: {} }, action) => {
  switch (action.type) {
    case COMMENT_UPDATE_REQUEST:
      return { loading: true, comment: [] };
    case COMMENT_UPDATE_SUCCESS:
      return { loading: false, comment: action.payload };
    case COMMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case COMMENT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const commentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_DELETE_REQUEST:
      return { loading: true };
    case COMMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COMMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case COMMENT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
