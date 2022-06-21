import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Modal from '../../Common/Modal';
import CustButton from '../../Common/Button';

import lostIco from '../../../assets/img/lost-ico.svg';
import close from '../../../assets/img/close-ico.svg';

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      paddingRight: '36px'
    }
  },
  naviBar: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginBottom: '50px'
  },
  close: {
    cursor: 'pointer',
    marginLeft: 'auto'
  },
  text: {
    fontSize: '16px',
    opacity: '0.7',
    maxWidth: '300px',
    textAlign: 'center',
    margin: '20px auto'
  },
  icon: {
    maxWidth: '80%'
  }
}));

function CardLost(props) {
  const { userData, closeReport } = props;
  const classes = useStyles();
  const [isModalOpened, setIsModalOpened] = useState(false);

  try {
    // const handleopenModal = () => {
    //   setIsModalOpened(true);
    // };

    const handleCloseModal = () => {
      setIsModalOpened(false);
    };

    const openIntercom = () => {
      handleCloseModal();
      if (window.Intercom) {
        window.Intercom('boot', {
          app_id: 'ckigeqdf',
          email: userData.accountDetails.email || '',
          phone: userData.accountDetails.mobileNumber || '',
          // eslint-disable-next-line
          user_id: userData ? userData._id : '',
          name: `${userData.accountDetails.firstName || ''} 
        ${userData.accountDetails.lastName || ''}`
        });
        window.Intercom('show');
      }
    };

    return (
      <div className={classes.wrapper}>
        <div className={classes.naviBar}>
          <div
            role="presentation"
            onClick={closeReport}
            className={classes.close}
          >
            <img src={close} alt="" />
          </div>
        </div>
        <img src={lostIco} alt="" className={classes.icon} />
        <Typography className={classes.text}>
          We’ll deactivate your lost debit card, give you a new card number, and
          mail you a new debit card.
        </Typography>
        <CustButton onClick={openIntercom}>Continue</CustButton>
        <Modal
          isOpened={isModalOpened}
          closeModal={handleCloseModal}
          callback={openIntercom}
          title="Report Lost"
          text="There will be a $5 Card Replacement Fee assessed to your account when your new card is issued. Your new card should arrive in 7-10 business days."
          yesBtnText="Confirm"
          noBtnText="Cancel"
        />
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

CardLost.defaultProps = {
  userData: undefined,
  closeReport: undefined
};

CardLost.propTypes = {
  userData: PropTypes.shape({
    accountDetails: PropTypes.shape({
      email: PropTypes.string,
      mobileNumber: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string
    })
  }),
  closeReport: PropTypes.func
};

export default CardLost;
