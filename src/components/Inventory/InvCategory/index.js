import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import shortid from 'shortid';
import { Tooltip, Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import CorneredBlock from '../../Common/CorneredBlock';
import history from '../../../history';

import gem from '../../../assets/img/gem.svg';

const useStyles = makeStyles(theme => ({
  categoryWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0 10px 0'
  },
  title: {
    fontSize: '24px',
    fontWeight: '500',
    fontFamily: 'Oswald',
    textTransform: 'uppercase'
  },
  arrowIcon: {
    height: '10px',
    marginLeft: '10px'
  },
  catItemsWrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  itemWrapper: {
    width: '100%',
    padding: '10px 15px',
    background: theme.palette.background.gray,
    border: `1px solid ${theme.palette.border.default}`,
    position: 'relative'
  },
  corBlockClass: {
    margin: '30px 20px 20px 0',
    maxWidth: '113px'
  },
  imgWrapper: {
    width: '80px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '-40px auto 0 auto',
    '& img': {
      maxWidth: '100%',
      maxHeight: '100%'
    }
  },
  grayscale: {
    filter: 'grayscale(100%)'
  },
  count: {
    fontSize: '20px',
    fontFamily: 'Oswald',
    fontWeight: '500',
    textAlign: 'center',
    margin: '0 auto',
    width: '80px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  itemName: {
    fontSize: '14px',
    textAlign: 'center',
    margin: '0 auto',
    width: '80px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  asLink: {
    cursor: 'pointer'
  }
}));

const catNames = {
  chests: 'Chests',
  consoles: 'Consoles',
  gems: 'Gems',
  gameStoreCredits: 'Store Credits',
  gameTokens: 'Game Tokens',
  videoGames: 'Games'
};

function InvCategory(props) {
  const { invItems, catName, items, games, openRedeemModal } = props;
  const classes = useStyles();
  const [catItems, setCatItems] = useState({});

  useEffect(() => {
    if (catName === 'gameStoreCredits') {
      const updatedItems = { ...items };
      delete updatedItems['Steam Credit'];
      delete updatedItems['XBox Credit'];
      delete updatedItems['PlayStation Credit'];
      delete updatedItems['Oculus Credit'];

      setCatItems(updatedItems);
    } else {
      setCatItems(items);
    }
  }, [items]);

  try {
    const goToOverview = () => history.push('/overview');

    // Add Games images into invItems
    const itemsData = { ...invItems };

    if (games) {
      games.map(item => {
        itemsData[item.name] = { icon: item.image, title: item.name };
        return null;
      });
    }

    const renderItem = item => {
      return (
        <CorneredBlock
          key={shortid.generate()}
          subClass={classes.corBlockClass}
        >
          <Tooltip title={itemsData[item] ? itemsData[item].title : ''}>
            <div className={classes.itemWrapper}>
              <div
                className={`${items[item] === 0 ? classes.grayscale : ''} ${
                  classes.imgWrapper
                }`}
              >
                <img
                  src={itemsData[item] ? itemsData[item].icon : gem}
                  alt={item}
                />
              </div>

              <Typography className={classes.count}>
                {items[item] || items[item] === 0 ? items[item] : 1}
              </Typography>
              <Typography className={classes.itemName}>
                {itemsData[item] ? itemsData[item].title : item}
              </Typography>
            </div>
          </Tooltip>
        </CorneredBlock>
      );
    };

    // Do not show Accessories and Game Tokens categories
    if (catName === 'accessories' || catName === 'gameTokens') {
      return null;
    }

    return (
      catName !== 'gems' && (
        <div className={classes.categoryWrapper}>
          <div className={classes.titleWrapper}>
            <Typography className={classes.title}>
              {catNames[catName] || catName}
            </Typography>
          </div>

          <div className={classes.catItemsWrapper}>
            {Object.keys(catItems).map(item => {
              // for Games and Accessries
              if (item === 'ownedItems') {
                return items.ownedItems.map(ownedItem => renderItem(ownedItem));
              }

              // for Chests
              if (catName === 'chests') {
                return (
                  <span
                    role="presentation"
                    onClick={goToOverview}
                    className={classes.asLink}
                    key={item}
                  >
                    {renderItem(item)}
                  </span>
                );
              }

              // for Store Credits
              if (catName === 'gameStoreCredits') {
                return (
                  <span
                    role="presentation"
                    onClick={() => {
                      openRedeemModal({
                        category: catName,
                        name: item,
                        count: catItems[item]
                      });
                    }}
                    className={classes.asLink}
                    key={item}
                  >
                    {renderItem(item)}
                  </span>
                );
              }

              // for others
              return (
                <span
                  role="presentation"
                  onClick={() => {
                    if (catItems[item] && catItems[item] !== 0) {
                      openRedeemModal({
                        category: catName,
                        name: item,
                        count: catItems[item]
                      });
                    }
                  }}
                  className={
                    catItems[item] && catItems[item] !== 0 ? classes.asLink : ''
                  }
                  key={item}
                >
                  {renderItem(item)}
                </span>
              );
            })}
          </div>
        </div>
      )
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

InvCategory.defaultProps = {
  invItems: undefined,
  catName: undefined,
  items: undefined,
  games: undefined,
  openRedeemModal: undefined
};

InvCategory.propTypes = {
  invItems: PropTypes.shape({}),
  catName: PropTypes.string,
  items: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
  games: PropTypes.arrayOf(PropTypes.shape({})),
  openRedeemModal: PropTypes.func
};

export default InvCategory;
