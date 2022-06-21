import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Slider from 'react-slick';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import CustButton from '../../Common/Button';

import gameRewards from '../../../assets/img/game-rewards.png';
import completeChallenges from '../../../assets/img/complete-challenges.png';
import swipePrize from '../../../assets/img/swipe-prize.png';
import secure from '../../../assets/img/secure.png';
import noFees from '../../../assets/img/no-fees.png';

function Step0(props) {
  const { classes, nextStep } = props;
  try {
    const settings = {
      arrows: false,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      pauseOnHover: false
    };

    const slides = {
      1: (
        <div className={classes.slideWrapper}>
          <Typography className={classes.h1}>
            A debit card with video game rewards.
          </Typography>
        </div>
      ),
      2: (
        <div className={classes.slideWrapper}>
          <div className={classes.imgWrapper}>
            <img src={gameRewards} alt="" className={classes.gameRewards} />
          </div>
          <Typography className={classes.h1}>Get Gaming Rewards</Typography>
          <Typography className={classes.text}>
            Win prizes like PS5s, Xbox, and free video games. Just make deposits
            and use your debit card.
          </Typography>
        </div>
      ),
      3: (
        <div className={classes.slideWrapper}>
          <div className={classes.imgWrapper}>
            <img src={swipePrize} alt="" className={classes.swipePrize} />
          </div>
          <Typography className={classes.h1}>
            A Prize with Every Swipe
          </Typography>
          <Typography className={classes.text}>
            Every time you use your card, you get a reward. Rewards are random,
            so check the app to see what you won!
          </Typography>
        </div>
      ),
      4: (
        <div className={classes.slideWrapper}>
          <div className={classes.imgWrapper}>
            <img
              src={completeChallenges}
              alt=""
              className={classes.completeChallenges}
            />
          </div>
          <Typography className={classes.h1}>
            Complete challenges to win more prizes
          </Typography>
          <Typography className={classes.text}>
            Get a new set of challenges each week. Complete them to win more
            prizes!
          </Typography>
        </div>
      ),
      5: (
        <div className={classes.slideWrapper}>
          <div className={classes.imgWrapper}>
            <img src={secure} alt="" className={classes.secure} />
          </div>
          <Typography className={classes.h1}>Secure & Protected</Typography>
          <Typography className={classes.text}>
            Your deposit’s are FDIC insured through The Piermont Bank up to
            $250,000.
          </Typography>
        </div>
      ),
      6: (
        <div className={classes.slideWrapper}>
          <div className={classes.imgWrapper}>
            <img src={noFees} alt="" className={classes.noFees} />
          </div>
          <Typography className={classes.h1}>No Monthly Fees</Typography>
          <Typography className={classes.text}>
            Mythia has no monthly fees and no minimum balance.
          </Typography>
        </div>
      )
    };

    return (
      <React.Fragment>
        <div className={classes.sliderWrapper}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Slider {...settings}>
            {Object.values(slides).map((item, index) => {
              return (
                // eslint-disable-next-line
                <div key={index}>{item}</div>
              );
            })}
          </Slider>
        </div>

        <div className={`${classes.form} ${classes.withPadding}`}>
          <CustButton
            onClick={nextStep}
            btnstyle="system"
            subclass={classes.signBtn}
          >
            Sign up
          </CustButton>
          <Typography className={classes.subtitle}>
            Already have an account?
            <Link className={classes.link} to="/signin">
              Log in
            </Link>
          </Typography>
        </div>

        <div className={classes.botText}>
          <div className={classes.botTextInner}>
            Banking and Debit Card services provided by Piermont Bank. Member
            FDIC, pursuant to license by Mastercard International Incorporated.
          </div>
        </div>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Step0.defaultProps = {
  classes: undefined,
  nextStep: undefined
};

Step0.propTypes = {
  classes: PropTypes.shape({
    slideWrapper: PropTypes.string,
    h1: PropTypes.string,
    imgWrapper: PropTypes.string,
    gameRewards: PropTypes.string,
    text: PropTypes.string,
    swipePrize: PropTypes.string,
    completeChallenges: PropTypes.string,
    secure: PropTypes.string,
    noFees: PropTypes.string,
    form: PropTypes.string,
    withPadding: PropTypes.string,
    signBtn: PropTypes.string,
    subtitle: PropTypes.string,
    link: PropTypes.string,
    botText: PropTypes.string,
    botTextInner: PropTypes.string,
    sliderWrapper: PropTypes.string
  }),
  nextStep: PropTypes.func
};

export default Step0;
