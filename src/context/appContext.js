import React from 'react';
import shortid from 'shortid';
// import userData from '../mock/main.json';

const AppContext = React.createContext({
  userToken: '',
  anonId: `anon-${shortid.generate()}`,
  userData: {},
  error: '',
  info: '',
  isAddAccountOpen: { isOpen: false, isRegistration: false },
  isPaymentOpen: { isOpen: false, type: 'deposit' },
  isDDOpen: { isOpen: false },
  isVerifyBAOpen: { isOpen: false },
  statements: null,
  giftShop: null,
  giftShopCategory: null
});

export default AppContext;
