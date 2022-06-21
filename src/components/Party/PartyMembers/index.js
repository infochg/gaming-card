import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Tooltip } from '@material-ui/core';
import Slider from 'react-slick';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import CorneredBlock from '../../Common/CorneredBlock';

import ava1 from '../../../assets/img/avatars/ava1.png';
import ava2 from '../../../assets/img/avatars/ava2.png';
import ava3 from '../../../assets/img/avatars/ava3.png';

const useStyles = makeStyles(theme => ({
  slider: {
    width: '100%',
    margin: '0 0 40px 0',
    '& ul.slick-dots': {
      bottom: '-40px',
      '& li': {
        '& button': {
          width: '8px',
          height: '8px',
          borderRadius: '0',
          background: theme.palette.background.likeBorder,
          '&:before': {
            display: 'none'
          }
        },
        '&.slick-active': {
          '& button': {
            background: theme.palette.background.purple
          }
        }
      }
    }
  },
  sliderItem: {
    padding: '0 20px 0 0'
  },
  corBlockClass: {
    margin: '30px 20px 0 0',
    maxWidth: '213px'
  },
  itemWrapper: {
    width: '100%',
    padding: '10px 15px',
    background: theme.palette.background.gray,
    border: `1px solid ${theme.palette.border.default}`,
    position: 'relative'
  },
  imgWrapper: {
    width: '80%',
    maxWidth: '80px',
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
  itemName: {
    fontSize: '16px',
    fontFamily: 'Oswald',
    fontWeight: '600',
    textAlign: 'center',
    margin: '0 auto',
    width: '90%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }
}));

const avas = [ava1, ava2, ava3, ava1, ava2];

function PartyMembers(props) {
  const { partyMembers } = props;
  const classes = useStyles();

  try {
    const settings = {
      arrows: false,
      dots: true,
      infinite: false,
      slidesToShow: partyMembers.length > 5 ? 5 : partyMembers.length,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: partyMembers.length > 4 ? 4 : partyMembers.length
          }
        },
        {
          breakpoint: 765,
          settings: {
            slidesToShow: partyMembers.length > 2 ? 2 : partyMembers.length
          }
        }
      ]
    };

    return (
      <div className={classes.slider}>
        {partyMembers && partyMembers.length > 1 ? (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Slider {...settings}>
            {partyMembers.map((item, index) => {
              if (item) {
                return (
                  <div key={item.email} className={classes.sliderItem}>
                    <Tooltip
                      title={`${item.firstName || ''} ${item.lastName || ''}`}
                    >
                      <CorneredBlock subClass={classes.corBlockClass}>
                        <div className={classes.itemWrapper}>
                          <div className={classes.imgWrapper}>
                            <img src={avas[index]} alt="" />
                          </div>
                          <Typography className={classes.itemName}>
                            {item.firstName} {item.lastName}
                          </Typography>
                        </div>
                      </CorneredBlock>
                    </Tooltip>
                  </div>
                );
              }
              return null;
            })}
          </Slider>
        ) : null}
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

PartyMembers.defaultProps = {
  partyMembers: undefined
};

PartyMembers.propTypes = {
  partyMembers: PropTypes.arrayOf(PropTypes.shape({}))
};

export default PartyMembers;
