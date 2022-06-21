import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import Modal from '../../components/Common/Modal';

function LogoutContainer(props) {
  const { openLogout, handleCloseLogout } = props;

  const logout = () => {
    cookie.remove('token');
    document.location.href = '/signin';
  };

  return (
    <Modal
      isOpened={openLogout}
      closeModal={handleCloseLogout}
      callback={logout}
      title="Do you really want log out?"
    />
  );
}

LogoutContainer.propTypes = {
  openLogout: PropTypes.bool,
  handleCloseLogout: PropTypes.func
};

LogoutContainer.defaultProps = {
  openLogout: undefined,
  handleCloseLogout: undefined
};

export default LogoutContainer;
