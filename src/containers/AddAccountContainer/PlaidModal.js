import PropTypes from 'prop-types';

function PlaidModal(props) {
  const { linkToken, handleClosePlaid, sendTokenToServer } = props;

  const onSuccess = publicToken => {
    sendTokenToServer({ publicToken });
    handleClosePlaid('success');
  };

  const onExit = () => {
    handleClosePlaid();
  };

  const onEvent = eventName => {
    if (eventName === 'HANDOFF') {
      handleClosePlaid('fail');
    }
  };

  // eslint-disable-next-line
  const plaidHandler = Plaid.create({
    token: linkToken,
    onSuccess,
    onExit,
    onEvent
  });

  // Open Link
  plaidHandler.open();

  return null;
}

PlaidModal.propTypes = {
  linkToken: PropTypes.string,
  handleClosePlaid: PropTypes.func,
  sendTokenToServer: PropTypes.func
};

PlaidModal.defaultProps = {
  linkToken: undefined,
  handleClosePlaid: undefined,
  sendTokenToServer: undefined
};

export default PlaidModal;
