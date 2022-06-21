import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../../../containers/ErrorBoundary';

function Countdown(props) {
  const { time } = props;
  const [timeLeft, setTimeLeft] = useState(
    Number(time) - Math.round(new Date().getTime() / 1000)
  );

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // eslint-disable-next-line
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  try {
    const secondsToHms = d => {
      const h = Math.floor(Number(d) / 3600);
      const m = Math.floor((Number(d) % 3600) / 60);
      const s = Math.floor((Number(d) % 3600) % 60);

      const hDisplay = h > 0 ? `${h}:` : '';
      const mDisplay = m > 0 ? `${m}:` : '';
      const sDisplay = s > 0 ? s : '';
      return hDisplay + mDisplay + sDisplay;
    };
    return secondsToHms(timeLeft);
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Countdown.propTypes = {
  time: PropTypes.number
};

Countdown.defaultProps = {
  time: undefined
};

export default Countdown;
