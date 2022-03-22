import React from 'react';
import { HYDRATE } from 'next-redux-wrapper';
import user from './user';
import post from './post';
import { combineReducers } from 'redux';

// const initialState = {
//   user: {
//     isLoggedIn: false,
//     user: null,
//     signUpData: {},
//     lognData: {},
//   },
//   post: {
//     mainPosts: [],
//   },
// };

// async action creator
// .....

// (이전살태, 액션) => 다음상태
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
