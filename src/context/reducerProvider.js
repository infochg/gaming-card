import React, { useContext, useReducer } from 'react';
import AppContext from './appContext';
import reducer from './reducer';

const ReducerProvider = props => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  const {
    anonId,
    userToken: userTokenInit,
    userData: userDataInit,
    isAddAccountOpen: isAddAccountOpenInit,
    isPaymentOpen: isPaymentOpenInit,
    isVerifyBAOpen: isVerifyBAOpenInit,
    isDDOpen: isDDOpenInit,
    statements: statementsInit,
    giftShop: giftShopInit,
    giftShopCategory: giftShopCategoryInit,
    error: errorInit,
    info: infoInit
  } = useContext(AppContext);
  const [userToken, userTokenDispatch] = useReducer(reducer, userTokenInit);
  const [userData, userDataDispatch] = useReducer(reducer, userDataInit);
  const [isAddAccountOpen, isAddAccountOpenDispatch] = useReducer(
    reducer,
    isAddAccountOpenInit
  );
  const [isPaymentOpen, isPaymentOpenDispatch] = useReducer(
    reducer,
    isPaymentOpenInit
  );
  const [isDDOpen, isDDOpenDispatch] = useReducer(reducer, isDDOpenInit);
  const [isVerifyBAOpen, isVerifyBAOpenDispatch] = useReducer(
    reducer,
    isVerifyBAOpenInit
  );
  const [statements, statementsDispatch] = useReducer(reducer, statementsInit);
  const [giftShop, giftShopDispatch] = useReducer(reducer, giftShopInit);
  const [giftShopCategory, giftShopCategoryDispatch] = useReducer(
    reducer,
    giftShopCategoryInit
  );
  const [error, errorDispatch] = useReducer(reducer, errorInit);
  const [info, infoDispatch] = useReducer(reducer, infoInit);

  return (
    <AppContext.Provider
      value={{
        anonId,
        userToken,
        userTokenDispatch,
        userData,
        userDataDispatch,
        error,
        errorDispatch,
        info,
        infoDispatch,
        isAddAccountOpen,
        isAddAccountOpenDispatch,
        isPaymentOpen,
        isPaymentOpenDispatch,
        isDDOpen,
        isDDOpenDispatch,
        isVerifyBAOpen,
        isVerifyBAOpenDispatch,
        statements,
        statementsDispatch,
        giftShop,
        giftShopDispatch,
        giftShopCategory,
        giftShopCategoryDispatch
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ReducerProvider;
