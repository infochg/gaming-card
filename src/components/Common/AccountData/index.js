import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Badge } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';

import defAva from '../../../assets/img/avatars/def-ava.png';
import gem from '../../../assets/img/gem.png';
import chest from '../../../assets/img/sm-chest.png';

const useStyles = makeStyles(theme => ({
  accountDataWrapper: {
    display: 'inline-flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      margin: '-21px 0 -10px 0'
    }
  },
  userDataWrapper: {
    position: 'relative'
  },
  userDataBlock: {
    padding: '0 30px',
    height: '71px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& img': {
      maxHeight: '40px',
      [theme.breakpoints.down('xs')]: {
        maxHeight: '30px'
      }
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '10px'
    }
  },
  userData: {
    color: theme.palette.text.primary,
    fontSize: '18px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: '140px',
    marginRight: '10px',
    [theme.breakpoints.down('md')]: {
      maxWidth: '100px'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  hideOverflow: {
    fontSize: '18px',
    maxWidth: 'calc(100% - 38px)',
    minWidth: 'calc(100% - 38px)',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'left',
    overflow: 'hidden'
  },
  gemsBalance: {
    margin: '0 0 0 auto',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      '& img': {
        width: '20px'
      }
    }
  },
  chestBalance: {
    padding: '10px',
    margin: '0 20px',
    position: 'relative',
    background:
      'radial-gradient(ellipse at center, rgba(253,140,2,0.6) 0%,rgba(125,185,232,0) 70%);',
    [theme.breakpoints.down('xs')]: {
      padding: '10px 5px',
      margin: '0 10px',
      '& img': {
        width: '30px'
      }
    }
  },
  badge: {
    height: '24px',
    minWidth: '24px',
    padding: '0 2px',
    fontSize: '12px',
    lineHeight: '1px',
    fontWeight: '700',
    background: theme.palette.background.red,
    border: '2px solid #fff',
    color: '#fff',
    marginTop: '3px',
    borderRadius: '100%',
    [theme.breakpoints.down('xs')]: {
      height: '16px',
      minWidth: '16px',
      fontSize: '10px'
    }
  },
  chestBadge: {
    height: '24px',
    minWidth: '24px',
    padding: '0 2px',
    fontSize: '12px',
    lineHeight: '1px',
    fontWeight: '700',
    background: theme.palette.background.red,
    border: '2px solid #fff',
    color: '#fff',
    marginTop: '3px',
    borderRadius: '100%',
    [theme.breakpoints.down('xs')]: {
      height: '16px',
      minWidth: '16px',
      fontSize: '10px'
    }
  }
}));

function AccountData(props) {
  const { userData } = props;
  const classes = useStyles();

  let gemsCount =
    userData && userData.inventory ? userData.inventory.gems.toFixed(0) : 0;
  if (userData && userData.inventory) {
    if (userData.inventory.gems > 1000 || userData.inventory.gems < -1000) {
      gemsCount = `${(userData.inventory.gems / 1000).toFixed(1)}k`;
    }
  }

  let chestsCount =
    userData && userData.ownedBoxes
      ? Object.values(userData.ownedBoxes).reduce((a, b) => a + b, 0)
      : 0;
  if (chestsCount > 1000) {
    chestsCount = `${(chestsCount / 1000).toFixed(1)}k`;
  }

  try {
    return (
      <React.Fragment>
        <div className={classes.accountDataWrapper}>
          <div className={classes.userDataWrapper}>
            <div className={classes.userDataBlock} role="presentation">
              <div className={classes.gemsBalance}>
                <Link to="/rewards-shop">
                  <Badge
                    badgeContent={gemsCount}
                    max={999999}
                    classes={{ badge: classes.badge }}
                  >
                    <img src={gem} alt="" />
                  </Badge>
                </Link>
              </div>
              <div className={classes.chestBalance}>
                <Link to="/overview">
                  <Badge
                    badgeContent={chestsCount}
                    max={999999}
                    classes={{ badge: classes.chestBadge }}
                  >
                    <img src={chest} alt="" />
                  </Badge>
                </Link>
              </div>
              <Link to="/settings">
                <img src={defAva} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

AccountData.defaultProps = {
  userData: undefined
};

AccountData.propTypes = {
  userData: PropTypes.shape({
    inventory: PropTypes.shape({
      gems: PropTypes.number
    }),
    ownedBoxes: PropTypes.shape({})
  })
};

export default AccountData;
