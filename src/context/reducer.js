import React from 'react';
import cookie from 'react-cookies';
import { toast } from 'react-toastify';
import Toast from '../components/Common/Toast';

function reducer(state, action) {
  // eslint-disable-next-line
  // console.log(' reducer ', state, action);
  const expires = new Date(Date.now() + 43200 * 1000);
  switch (action.type) {
    case 'SET_USER_TOKEN':
      if (action.payload && action.payload.Authorization) {
        cookie.save('token', action.payload.Authorization, {
          path: '/',
          sameSite: 'Lax',
          expires
        });
      }
      return action.payload;
    case 'SET_USER_DATA':
      return action.payload;
    case 'UPDATE_USER_DATA':
      return { ...state, ...action.payload.userData };
    case 'SET_IS_ADD_ACCOUNT_OPEN':
      return action.payload;
    case 'SET_IS_PAYMENT_OPEN':
      return action.payload;
    case 'SET_IS_DD_OPEN':
      return action.payload;
    case 'SET_IS_VERIFY_BA_OPEN':
      return action.payload;
    case 'SET_STATEMENTS':
      return action.payload;
    case 'SET_GIFT_SHOP':
      return action.payload;
    case 'SET_GIFT_SHOP_CATEGORY':
      return action.payload;
    case 'SET_ERROR':
      toast(<Toast message={action.payload} type="error" />, { type: 'error' });
      return action.payload;
    case 'SET_INFO':
      toast(<Toast message={action.payload} type="success" />, {
        type: 'success'
      });
      return action.payload;
    default:
      return state;
  }
}

export default reducer;
