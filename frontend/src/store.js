import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  postListReducer,
  postCreateReducer,
  postDetailsReducer,
  postLikeReducer,
  postUnlikeReducer,
  postEditReducer,
  postDeleteReducer,
} from './reducers/postReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';

import {
  commentListByPostReducer,
  commentCreateReducer,
  commentUpdateReducer,
  commentDeleteReducer,
} from './reducers/commentReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  postList: postListReducer,
  postCreate: postCreateReducer,
  postDetails: postDetailsReducer,
  postLike: postLikeReducer,
  postUnlike: postUnlikeReducer,
  postEdit: postEditReducer,
  postDelete: postDeleteReducer,
  commentListByPost: commentListByPostReducer,
  commentCreate: commentCreateReducer,
  commentUpdate: commentUpdateReducer,
  commentDelete: commentDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
