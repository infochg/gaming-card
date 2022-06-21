import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import CorneredBlock from '../../Common/CorneredBlock';

import gem from '../../../assets/img/gem.svg';
import coin from '../../../assets/img/dollar-coin.svg';
import corner from '../../../assets/img/top-corner-gray-system.svg';

const useStyles = makeStyles(theme => ({
  itemWrapper: {
    cursor: 'pointer',
    width: 'calc(50% - 30px)',
    display: 'inline-flex',
    height: '100%',
    margin: '0 0 40px 0',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  disabled: {
    cursor: 'default'
  },
  itemInner: {
    width: '100%',
    minHeight: '150px',
    padding: '30px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    background: theme.palette.background.gray,
    border: `1px solid ${theme.palette.border.default}`
  },
  descBlock: {
    marginRight: '10px'
  },
  imageWrapper: {
    background: '#fff',
    border: `1px solid ${theme.palette.border.default}`,
    position: 'relative',
    maxWidth: '50%',
    margin: '0 0 0 auto'
  },
  topCornerDots: {
    width: '100%',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      zIndex: '2',
      top: '-1px',
      left: '-1px',
      width: '14px',
      height: '14px',
      background: `url(${corner}) no-repeat center`,
      backgroundSize: '100% 100%',
      transform: 'rotate(270deg)'
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      zIndex: '2',
      top: '-1px',
      right: '-1px',
      width: '14px',
      height: '14px',
      background: `url(${corner}) no-repeat center`,
      backgroundSize: '100% 100%'
    }
  },
  bottomCornerDots: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      zIndex: '2',
      bottom: '-1px',
      right: '-1px',
      width: '14px',
      height: '14px',
      background: `url(${corner}) no-repeat center`,
      backgroundSize: '100% 100%',
      transform: 'rotate(90deg)'
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      zIndex: '2',
      bottom: '-1px',
      left: '-1px',
      width: '14px',
      height: '14px',
      background: `url(${corner}) no-repeat center`,
      backgroundSize: '100% 100%',
      transform: 'rotate(180deg)'
    }
  },
  itemImage: {
    maxWidth: '100%'
  },
  corBlockClass: {
    width: '100%'
  },
  title: {
    fontSize: '28px',
    textAlign: 'left',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    [theme.breakpoints.down('md')]: {
      fontSize: '20px'
    }
  },
  type: {
    fontSize: '12px',
    color: theme.palette.text.lightGray,
    marginTop: '10px'
  },
  buyBlock: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    textAlign: 'left',
    marginTop: '20px',
    backgroundColor: theme.palette.background.likeBorder,
    '& img': {
      maxHeight: '60px'
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: 0,
      borderBottom: `10px solid ${theme.palette.background.gray}`,
      borderRight: `10px solid ${theme.palette.background.likeBorder}`
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: 0,
      borderTop: `10px solid${theme.palette.background.gray}`,
      borderLeft: `10px solid ${theme.palette.background.likeBorder}`
    }
  },
  price: {
    fontSize: '24px',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.purple,
    paddingRight: '15px'
  }
}));

function ShopItem(props) {
  const { item, getItem, gems } = props;
  const classes = useStyles();

  try {
    let priceImg = gem;
    if (item.priceVal === 'coins') {
      priceImg = coin;
    }

    return (
      <div
        className={`${classes.itemWrapper} ${
          gems < Number(item.gems) ? classes.disabled : ''
        }`}
        role="presentation"
        onClick={() => getItem(item)}
      >
        <CorneredBlock subClass={classes.corBlockClass}>
          <div className={classes.itemInner}>
            <div className={classes.descBlock}>
              <Typography className={classes.title}>
                {item.name.length > 50
                  ? `${item.name.substr(0, 50)}...`
                  : item.name}
              </Typography>
              <Typography className={classes.type}>{item.console}</Typography>
              <div className={classes.buyBlock}>
                <img src={priceImg} alt="" />
                <Typography className={classes.price}>{item.gems}</Typography>
              </div>
            </div>
            <div className={classes.imageWrapper}>
              <div className={classes.topCornerDots}>
                <div className={classes.bottomCornerDots}>
                  <img src={item.image} alt="" className={classes.itemImage} />
                </div>
              </div>
            </div>
          </div>
        </CorneredBlock>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

ShopItem.defaultProps = {
  item: undefined,
  getItem: undefined,
  gems: undefined
};

ShopItem.propTypes = {
  item: PropTypes.shape({
    priceVal: PropTypes.number,
    gems: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    console: PropTypes.string,
    image: PropTypes.string
  }),
  getItem: PropTypes.func,
  gems: PropTypes.number
};

export default ShopItem;
