import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../containers/ErrorBoundary';
import InvCategory from '../../components/Inventory/InvCategory';
import RedeemModal from '../../components/Inventory/RedeemModal';
import appContext from '../../context/appContext';
import fetchData from '../../utils/fetch';

import smallChest from '../../assets/img/sm-chest.png';
import mediumChest from '../../assets/img/med-chest.png';
import largeChest from '../../assets/img/lg-chest.png';
import steamCredits from '../../assets/img/inventory/steam-credits.svg';
import xboxCredits from '../../assets/img/inventory/xbox-credits.svg';
import psCredits from '../../assets/img/inventory/ps-credits.svg';
import oculusCredits from '../../assets/img/inventory/oculus-credits.svg';
import epicCredits from '../../assets/img/inventory/epic-credits.svg';
import apexCredits from '../../assets/img/inventory/apex-credits.svg';
import riotCredits from '../../assets/img/inventory/riot-credits.svg';
import fortnineCredits from '../../assets/img/inventory/fortnine-credits.svg';
import ps5 from '../../assets/img/inventory/ps5.png';
import xbox from '../../assets/img/inventory/xbox.png';
import quest2 from '../../assets/img/inventory/quest2.png';
import nindendo from '../../assets/img/inventory/nindendo.png';
import videoGames from '../../assets/img/inventory/videogame.svg';

const useStyles = makeStyles(() => ({
  placeholder: {
    fontSize: '16px',
    opacity: '0.7'
  }
}));

const invItems = {
  'Small Chest': {
    icon: smallChest,
    title: 'Small Chest'
  },
  'Medium Chest': {
    icon: mediumChest,
    title: 'Medium Chest'
  },
  'Large Chest': {
    icon: largeChest,
    title: 'Large Chest'
  },
  'Steam Credits': {
    icon: steamCredits,
    title: 'Steam Credits',
    store: 'Steam Store'
  },
  'XBox Credits': {
    icon: xboxCredits,
    title: 'XBox Credits',
    store: 'XBox Store'
  },
  'PlayStation Credits': {
    icon: psCredits,
    title: 'PlayStation Credits',
    store: 'PlayStation Store'
  },
  'Oculus Credits': {
    icon: oculusCredits,
    title: 'Oculus Credits',
    store: 'Oculus Store'
  },
  'Epic Credit': {
    icon: epicCredits,
    title: 'Epic Credit',
    store: 'Epic Store'
  },
  'Apex Credits': {
    icon: apexCredits,
    title: 'Apex Credits',
    store: 'Apex Store'
  },
  // 'Apex Tokens': { icon: apexCredits, title: 'Apex Tokens' },
  // 'Riot Points': { icon: riotCredits, title: 'Riot Points' },
  'Riot Credits': {
    icon: riotCredits,
    title: 'Riot Credits',
    store: 'Riot Store'
  },
  'Fortnite Credits': {
    icon: fortnineCredits,
    title: 'Fortnite Credits',
    store: 'Fortnite Store'
  },
  // 'Fortnite vBucks': { icon: fortnineCredits, title: 'Fortnite vBucks' },
  PS5: {
    icon: ps5,
    title: 'PS5'
  },
  XBox: {
    icon: xbox,
    title: 'XBox'
  },
  'XBox or PS5': {
    icon: ps5,
    title: 'XBox or PS5'
  },
  'Oculus Quest 2': {
    icon: quest2,
    title: 'Oculus Quest 2'
  },
  'Nintendo Switch': {
    icon: nindendo,
    title: 'Nintendo Switch'
  },
  buyAnyGame: {
    icon: videoGames,
    title: 'Buy Any Game'
  }
};

function Inventory() {
  const classes = useStyles();
  const { giftShop, giftShopDispatch, userData, errorDispatch } = useContext(
    appContext
  );

  const [redeemItem, setRedeemItem] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  // get shop data
  const onSuccessShop = payload => {
    giftShopDispatch({
      type: 'SET_GIFT_SHOP',
      payload: payload || {}
    });
  };

  const onErrorShop = payload => {
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  useEffect(() => {
    if (!giftShop) {
      fetchData('/rewards/getRewardShop', 'GET', onSuccessShop, onErrorShop);
    }
  }, [giftShop]);

  // Redeem callbacks
  const onSuccessRedeem = () => {
    setShowLoader(false);
    setRedeemItem({ ...redeemItem, success: true });
  };

  const onErrorRedeem = payload => {
    setShowLoader(false);
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  // Redeem game credits
  const redeemCredits = data => {
    setShowLoader(true);
    fetchData(
      '/rewards/redeemCredits',
      'POST',
      onSuccessRedeem,
      onErrorRedeem,
      data
    );
  };

  // Redeem any game
  const redeemGame = data => {
    setShowLoader(true);
    fetchData(
      '/rewards/redeemGame',
      'POST',
      onSuccessRedeem,
      onErrorRedeem,
      data
    );
  };

  // Redeem console
  const redeemConsole = data => {
    setShowLoader(true);
    fetchData(
      '/rewards/redeemConsole',
      'POST',
      onSuccessRedeem,
      onErrorRedeem,
      data
    );
  };

  const redeemAction = data => {
    if (redeemItem) {
      if (redeemItem.category === 'gameStoreCredits') {
        redeemCredits(data);
      }

      if (
        redeemItem.category === 'videoGames' &&
        redeemItem.name === 'buyAnyGame'
      ) {
        redeemGame(data);
      }

      if (redeemItem.category === 'consoles') {
        redeemConsole(data);
      }
    }
  };

  const openRedeemModal = data => {
    setRedeemItem(data);
  };

  const closeRedeemModal = () => {
    setRedeemItem(null);
  };

  try {
    return userData && userData.inventory && Object.keys(userData.inventory) ? (
      <React.Fragment>
        <InvCategory
          catName="chests"
          invItems={invItems}
          items={{
            'Small Chest': userData.ownedBoxes ? userData.ownedBoxes.small : 0,
            'Medium Chest': userData.ownedBoxes
              ? userData.ownedBoxes.medium
              : 0,
            'Large Chest': userData.ownedBoxes ? userData.ownedBoxes.large : 0
          }}
        />
        {Object.keys(userData.inventory).map(item => {
          return (
            <InvCategory
              key={item}
              invItems={invItems}
              catName={item || ''}
              games={giftShop ? giftShop.videoGames : []}
              openRedeemModal={openRedeemModal}
              items={
                userData.inventory[item] || userData.inventory[item] === 0
                  ? userData.inventory[item]
                  : {}
              }
            />
          );
        })}
        <RedeemModal
          isOpened={!!redeemItem}
          redeemItem={redeemItem}
          invItems={invItems}
          redeemAction={redeemAction}
          closeModal={closeRedeemModal}
          showLoader={showLoader}
        />
      </React.Fragment>
    ) : (
      <Typography className={classes.placeholder}>
        There is no items in your inventory.
      </Typography>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default Inventory;
