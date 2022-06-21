import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactPixel from 'react-facebook-pixel';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TopNavbar from '../../components/Common/TopNavbar';
import ToastsContainer from '../../components/Common/ToastsContainer';
import Footer from '../../components/Common/Footer';
import PinwheelContainer from '../../containers/PinwheelContainer';
import { segChangePage } from '../../utils/segment';

import signBg from '../../assets/img/sign-bg.jpg';

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 'calc(100vh - 137px)'
  },
  container: {
    paddingTop: '20px',
    paddingBottom: '20px',
    textAlign: 'center'
  },
  signinWrapper: {
    background: `url(${signBg}) no-repeat center`,
    backgroundSize: 'cover',
    minHeight: '100%',
    [theme.breakpoints.down('md')]: {
      background: `url(${signBg}) no-repeat left bottom`,
      backgroundSize: 'cover'
    },
    [theme.breakpoints.down('xs')]: {
      background: `url(${signBg}) no-repeat right top`,
      backgroundSize: 'cover'
    }
  },
  wrapper: {
    background: `url(${signBg}) no-repeat center`,
    backgroundSize: 'cover',
    minHeight: '100%',
    [theme.breakpoints.down('md')]: {
      background: `url(${signBg}) no-repeat left bottom`,
      backgroundSize: 'cover'
    },
    [theme.breakpoints.down('xs')]: {
      background: `#F0F4F9`
    }
  }
}));

function SystemLayout(props) {
  const { location, component, userData, anonId } = props;
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);

    if (location.pathname === '/registration') {
      window.location.replace('https://www.mythia.com/');
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Segment
    // eslint-disable-next-line
    segChangePage(location.pathname, userData ? userData._id : null, anonId);

    // Intercom
    if (window.Intercom) {
      window.Intercom('shutdown');
      // window.Intercom('hide');
      // window.Intercom('update', {
      //   hide_default_launcher: true
      // });
    }

    // FB Pixel
    ReactPixel.pageView();

    // Snapchat Pixel
    // eslint-disable-next-line
    snaptr('track', 'PAGE_VIEW');

    // TikTok Pixel
    // eslint-disable-next-line
    ttq.track('Browse');
  }, [location.pathname]);

  return (
    <div
      className={
        location.pathname === '/' ? classes.signinWrapper : classes.wrapper
      }
    >
      <TopNavbar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} isSystem />
      <div className={classes.content}>
        <Container className={classes.container}>{component}</Container>
      </div>
      <ToastsContainer />
      <PinwheelContainer />
      <Footer />
    </div>
  );
}

SystemLayout.propTypes = {
  component: PropTypes.node,
  isAddAccountOpen: PropTypes.shape({}),
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  userData: PropTypes.shape({}),
  anonId: PropTypes.string
};

SystemLayout.defaultProps = {
  component: undefined,
  isAddAccountOpen: undefined,
  location: undefined,
  userData: undefined,
  anonId: undefined
};

export default withRouter(SystemLayout);
