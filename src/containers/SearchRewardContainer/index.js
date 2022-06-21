import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import ErrorBoundary from '../ErrorBoundary';
import CustomTextField from '../../components/Common/TextField';
import appContext from '../../context/appContext';

import close from '../../assets/img/close-ico.svg';

const useStyles = makeStyles(() => ({
  searchWrapper: {
    position: 'relative',
    textAlign: 'center',
    width: '100%',
    margin: '0 -10px 0 5px'
  },
  search: {
    '& input': {
      paddingRight: '35px'
    }
  },
  close: {
    position: 'absolute',
    top: '27px',
    right: '10px',
    cursor: 'pointer'
  }
}));

function SearchRewardContainer() {
  const classes = useStyles();
  const { giftShop, giftShopDispatch, giftShopCategory } = useContext(
    appContext
  );

  const [searchData, setSearchData] = useState('');
  const [giftShopInit, setGiftShopInit] = useState({});

  const clearSearch = () => {
    setSearchData('');
    giftShopDispatch({
      type: 'SET_GIFT_SHOP',
      payload: giftShopInit
    });
  };

  useEffect(() => {
    if (
      giftShop &&
      Object.keys(giftShop).length > 0 &&
      Object.keys(giftShopInit).length === 0
    ) {
      setGiftShopInit(giftShop);
    }
  }, [giftShop]);

  useEffect(() => {
    if (!giftShopCategory && Object.keys(giftShopInit).length > 0) {
      clearSearch();
    }
  }, [giftShopCategory]);

  const changeField = e => {
    if (e.target.name === 'searchData') {
      setSearchData(e.target.value);

      if (giftShopInit && giftShopInit[giftShopCategory]) {
        const foundItems = [];
        giftShopInit[giftShopCategory].map(item => {
          if (
            item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
          ) {
            foundItems.push(item);
          }

          return null;
        });

        const payload = { ...giftShopInit };
        payload[giftShopCategory] = foundItems.slice(0);

        giftShopDispatch({
          type: 'SET_GIFT_SHOP',
          payload
        });
      }
    }
  };

  try {
    return (
      giftShopCategory && (
        <div className={classes.searchWrapper}>
          <CustomTextField
            name="searchData"
            value={searchData}
            label="Search"
            onChange={changeField}
            variant="outlined"
            className={classes.search}
            fullWidth
          />
          {searchData !== '' && (
            <img
              src={close}
              alt=""
              role="presentation"
              onClick={clearSearch}
              className={classes.close}
            />
          )}
        </div>
      )
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default SearchRewardContainer;
