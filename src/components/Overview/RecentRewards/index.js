import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import shortid from 'shortid';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Pagination from '../../Common/Pagination';
import CorneredBlock from '../../Common/CorneredBlock';

import gems from '../../../assets/img/inventory/gem.png';
import diamond from '../../../assets/img/diamond.svg';
import chest from '../../../assets/img/chest.svg';
import apexCredits from '../../../assets/img/inventory/apex-credits.svg';
import epicCredit from '../../../assets/img/inventory/epic-credits.svg';
import fortniteCredits from '../../../assets/img/inventory/fortnine-credits.svg';
import oculusCredit from '../../../assets/img/inventory/oculus-credits.svg';
import playStationCredit from '../../../assets/img/inventory/ps-credits.svg';
import riotCredits from '../../../assets/img/inventory/riot-credits.svg';
import steamCredit from '../../../assets/img/inventory/steam-credits.svg';
import xBoxCredit from '../../../assets/img/inventory/xbox-credits.svg';

const useStyles = makeStyles(theme => ({
  title: {
    padding: '10px 0',
    fontSize: '28px',
    textAlign: 'left',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase'
  },
  contentBlock: {
    width: '100%',
    margin: '-5px 0 40px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  noRewards: {
    fontSize: '16px',
    opacity: '0.7'
  },
  rewardLine: {
    width: '100%',
    padding: '5px 0',
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.background.gray,
    border: `1px solid ${theme.palette.border.default}`
  },
  corBlockClass: {
    margin: '10px 0'
  },
  rewardIcon: {
    marginLeft: '5px',
    width: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '16px',
    background: 'rgba(255,255,255,0.1)',
    '& img': {
      maxWidth: '35px',
      maxHeight: '35px'
    }
  },
  rewardName: {
    padding: '0 10px',
    fontSize: '16px'
  },
  rewardAmount: {
    margin: '0 15px 0 auto',
    paddingLeft: '10px',
    fontSize: '28px',
    color: theme.palette.text.purple,
    fontFamily: 'Oswald',
    fontWeight: '700'
  }
}));

const creditIcons = {
  'Apex Credits': apexCredits,
  'Epic Credit': epicCredit,
  'Fortnite Credits': fortniteCredits,
  'Oculus Credit': oculusCredit,
  'Oculus Credits': oculusCredit,
  'PlayStation Credit': playStationCredit,
  'PlayStation Credits': playStationCredit,
  'Riot Credits': riotCredits,
  'Steam Credit': steamCredit,
  'Steam Credits': steamCredit,
  'XBox Credit': xBoxCredit,
  'XBox Credits': xBoxCredit
};

function RecentRewards(props) {
  const { recentRewards } = props;
  const classes = useStyles();
  const [curContent, setCurContent] = useState([]);

  useEffect(() => {
    setCurContent(recentRewards);
  }, [recentRewards]);

  try {
    return (
      <React.Fragment>
        <div className={classes.title}>Recent Rewards</div>
        <div className={classes.contentBlock}>
          {curContent.length > 0 ? (
            <React.Fragment>
              {curContent.slice(0, 7).map(item => {
                let rewardImg = gems;
                if (item.type === 'gameCredits') {
                  rewardImg = creditIcons[item.title] || diamond;
                } else if (item.type === 'extra_box') {
                  rewardImg = chest;
                }
                return (
                  <CorneredBlock
                    subClass={classes.corBlockClass}
                    key={shortid.generate()}
                  >
                    <div className={classes.rewardLine}>
                      <div className={classes.rewardIcon}>
                        <img src={rewardImg} alt="" />
                      </div>
                      <Typography className={classes.rewardName}>
                        {item.title || ''}
                      </Typography>
                      <Typography className={classes.rewardAmount}>
                        {item.numberType && item.numberType === 'USD'
                          ? '$'
                          : ''}
                        {item.amount}
                      </Typography>
                    </div>
                  </CorneredBlock>
                );
              })}
              <Pagination
                inputData={recentRewards}
                setCurContent={setCurContent}
                itemsPerPage={7}
              />
            </React.Fragment>
          ) : (
            <Typography className={classes.noRewards}>
              There is no recent rewards.
            </Typography>
          )}
        </div>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

RecentRewards.defaultProps = {
  recentRewards: undefined
};

RecentRewards.propTypes = {
  recentRewards: PropTypes.arrayOf(PropTypes.shape({}))
};

export default RecentRewards;
