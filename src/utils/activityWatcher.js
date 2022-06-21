function activityWatcher(cb) {
  // The number of seconds that have passed
  // since the user was active.
  let secondsSinceLastActivity = 0;

  // 20 minutes. 60 x 20 = 1200 seconds.
  const maxInactivity = 1200;

  // Redirection page
  const signedOutPath = '/signin';

  // Setup the setInterval method to run
  // every second. 1000 milliseconds = 1 second.
  setInterval(() => {
    // eslint-disable-next-line
    secondsSinceLastActivity++;
    // if the user has been inactive or idle for longer
    // then the seconds specified in maxInactivity
    if (secondsSinceLastActivity > maxInactivity) {
      if (cb && window.location.pathname !== signedOutPath) {
        cb();
      }
    }
  }, 1000);

  // The function that will be called whenever a user is active
  function activity() {
    // reset the secondsSinceLastActivity variable
    // back to 0
    secondsSinceLastActivity = 0;
  }

  // An array of DOM events that should be interpreted as
  // user activity.
  const activityEvents = [
    'mousedown',
    'mousemove',
    'keydown',
    'scroll',
    'touchstart'
  ];

  // add these events to the document.
  // register the activity function as the listener parameter.
  activityEvents.forEach(eventName => {
    document.addEventListener(eventName, activity, true);
  });
}

export default activityWatcher;
