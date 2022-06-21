import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import shortid from 'shortid';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../containers/ErrorBoundary';
import Preloader from '../../components/Common/Preloader';
import Modal from '../../components/Common/Modal';
import ShopCategory from '../../components/Rewards/ShopCategory';
import ShopItem from '../../components/Rewards/ShopItem';
import Icon from '../../components/Common/Icon';
import SearchRewardContainer from '../../containers/SearchRewardContainer';
import appContext from '../../context/appContext';
import fetchData from '../../utils/fetch';

import accessoriesIcon from '../../assets/img/shop-categories/accessories-ico.png';
import consolesIcon from '../../assets/img/shop-categories/consoles-ico.png';
import creditsIcon from '../../assets/img/shop-categories/credits-ico.png';
import gamesIcon from '../../assets/img/shop-categories/games-ico.png';

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    width: '100%'
  },
  content: {
    fontSize: '36px',
    fontWeight: '900',
    textAlign: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: '30px'
  },
  title: {
    fontFamily: 'Oswald',
    fontSize: '28px',
    textTransform: 'uppercase',
    fontWeight: '700',
    color: theme.palette.text.darkPurple,
    margin: '30px 0',
    display: 'flex',
    alignItems: 'center'
  },
  confirmText: {
    margin: '30px auto 10px auto'
  },
  comingSoonBlock: {
    textAlign: 'center',
    margin: '0 auto',
    paddingRight: '25px'
  },
  comingSoonBlockTitle: {
    fontFamily: 'Oswald',
    fontSize: '20px',
    fontWeight: '600'
  },
  comingSoonBlockText: {
    fontSize: '14px',
    marginTop: '10px',
    color: theme.palette.text.gray
  },
  backBtn: {
    cursor: 'pointer',
    height: '18px',
    marginRight: '20px'
  },
  showOnMobiles: {
    width: '100%',
    paddingRight: '35px',
    marginTop: '20px',
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  }
}));

const categories = {
  accessories: {
    title: 'Accessories',
    icon: accessoriesIcon
  },
  consoles: {
    title: 'Consoles',
    icon: consolesIcon
  },
  storeCredits: {
    title: 'Store Credits',
    icon: creditsIcon
  },
  videoGames: {
    title: 'Video Games',
    icon: gamesIcon
  }
};

function Rewards() {
  const classes = useStyles();
  const {
    giftShop,
    giftShopDispatch,
    giftShopCategory,
    giftShopCategoryDispatch,
    userData,
    errorDispatch
  } = useContext(appContext);
  const [showLoader, setShowLoader] = useState(false);

  // get shop data
  const onSuccessShop = payload => {
    setShowLoader(false);
    giftShopDispatch({
      type: 'SET_GIFT_SHOP',
      payload: payload || {}
    });
  };

  const onErrorShop = payload => {
    setShowLoader(false);
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  useEffect(() => {
    if (!giftShop) {
      setShowLoader(true);
      fetchData('/rewards/getRewardShop', 'GET', onSuccessShop, onErrorShop);
    }
  }, [giftShop]);

  // Confirm Modal
  const [itemData, setItemData] = useState(null);

  const confirmRedeem = item => {
    if (
      userData &&
      userData.inventory &&
      Number(userData.inventory.gems) > Number(item.gems)
    ) {
      setItemData({
        id: item.id,
        type: giftShopCategory,
        name: item.name,
        gems: Number(item.gems)
      });
    }
  };

  const closeConfirmModal = () => setItemData(null);

  // Redeem Modal
  const [isRedeemed, setIsRedeemed] = useState(false);
  const closeRedeemModal = () => setIsRedeemed(false);

  try {
    const showItems = title => {
      giftShopCategoryDispatch({
        type: 'SET_GIFT_SHOP_CATEGORY',
        payload: title
      });
    };

    let items = [];
    if (giftShopCategory && giftShop[giftShopCategory]) {
      items = giftShop[giftShopCategory];
    }

    const clearItems = () => {
      giftShopCategoryDispatch({
        type: 'SET_GIFT_SHOP_CATEGORY',
        payload: null
      });
    };

    // Redeem shop item
    const onSuccessGetItem = () => {
      setShowLoader(false);
      closeConfirmModal();
      setIsRedeemed(true);
    };

    const onErrorGetItem = payload => {
      setShowLoader(false);
      closeConfirmModal();
      errorDispatch({ type: 'SET_ERROR', payload });
    };

    const getItem = () => {
      setShowLoader(true);

      fetchData(
        '/rewards/redeemReward',
        'POST',
        onSuccessGetItem,
        onErrorGetItem,
        itemData
      );
    };

    return (
      <React.Fragment>
        {!giftShopCategory ? (
          <div className={classes.contentWrapper}>
            <div className={classes.comingSoonBlock}>
              <Typography className={classes.comingSoonBlockTitle}>
                Want a game that&lsquo;s not listed?
              </Typography>
              <Typography className={classes.comingSoonBlockText}>
                Message us to turn your gems into any video game or console!
              </Typography>
            </div>
            <Typography className={classes.title}>Rewards shop</Typography>
            <div className={classes.content}>
              {!showLoader ? (
                Object.keys(giftShop).map(item => (
                  <ShopCategory
                    key={shortid.generate()}
                    categories={categories}
                    item={item}
                    showItems={showItems}
                  />
                ))
              ) : (
                <Preloader />
              )}
            </div>
          </div>
        ) : (
          <div className={classes.contentWrapper}>
            <div className={classes.comingSoonBlock}>
              <Typography className={classes.comingSoonBlockTitle}>
                Want a game that&lsquo;s not listed?
              </Typography>
              <Typography className={classes.comingSoonBlockText}>
                Message us to turn your gems into any video game or console!
              </Typography>
            </div>

            <div className={classes.showOnMobiles}>
              <SearchRewardContainer />
            </div>

            <Typography className={classes.title}>
              <Icon
                icon="arrow-left"
                className={classes.backBtn}
                role="presentation"
                onClick={clearItems}
              />{' '}
              {categories[giftShopCategory].title || 'Rewards shop'}
            </Typography>

            <div className={classes.content}>
              {!showLoader ? (
                items.map(item => (
                  <ShopItem
                    key={shortid.generate()}
                    item={item}
                    getItem={confirmRedeem}
                    gems={
                      userData && userData.inventory
                        ? Number(userData.inventory.gems)
                        : 0
                    }
                  />
                ))
              ) : (
                <Preloader />
              )}
            </div>
          </div>
        )}

        <Modal
          isOpened={!!itemData}
          closeModal={closeConfirmModal}
          title="Confirmation."
          content={
            <div className={classes.confirmText}>
              Do want to spend <b>{itemData ? itemData.gems : ''} gems</b> to
              get <b>{itemData ? itemData.name : ''}</b>?
            </div>
          }
          callback={getItem}
          loader={showLoader}
        />

        <Modal
          isOpened={isRedeemed}
          closeModal={closeRedeemModal}
          title="Prize redeemed."
          text="Your prize has been redeemed."
          noBtns
        />
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default Rewards;
