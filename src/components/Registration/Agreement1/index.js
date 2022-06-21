import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import CustButton from '../../Common/Button';

import agreement from '../../../assets/docs/Electronic_Disclosure_and_Consent_Agreement.pdf';

function Agreement1(props) {
  const { classes, goBack } = props;

  try {
    return (
      <React.Fragment>
        <Typography className={`${classes.h1} ${classes.center}`}>
          Electronic Communication Agreement
        </Typography>
        <embed src={agreement} width="100%" height="400px" />
        <div className={classes.form}>
          <CustButton
            onClick={goBack}
            btnstyle="system"
            fullWidth
            subclass={classes.btnWithMarg}
          >
            Go Back
          </CustButton>
        </div>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Agreement1.defaultProps = {
  classes: undefined,
  goBack: undefined
};

Agreement1.propTypes = {
  classes: PropTypes.shape({
    h1: PropTypes.string,
    center: PropTypes.string,
    form: PropTypes.string,
    btnWithMarg: PropTypes.string
  }),
  goBack: PropTypes.func
};

export default Agreement1;
