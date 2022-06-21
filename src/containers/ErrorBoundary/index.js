import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchData from '../../utils/fetch';

const ErrorBoundary = ({ error }) => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    // console.log(error);

    fetchData('/admin/saveErrorLog', 'POST', undefined, undefined, {
      log: `error: Component error, stack: ${error.stack}`
    });
  }, [error]);

  return <h4>Oops!!! Something went wrong</h4>;
};

ErrorBoundary.defaultProps = {
  error: undefined
};

ErrorBoundary.propTypes = {
  error: PropTypes.shape({
    stack: PropTypes.string
  })
};

export default ErrorBoundary;
