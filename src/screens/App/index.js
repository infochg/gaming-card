import React, { useContext, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import cookie from 'react-cookies';
import posthog from 'posthog-js';
import { FullStoryAPI } from 'react-fullstory';
import { indexRoutes, systemRoutes } from '../../routes';
import ErrorPage from '../ErrorPage';
import SystemLayout from '../../layouts/SystemLayout';
import DashboardLayout from '../../layouts/DashboardLayout';
import Signin from '../Signin';
import appContext from '../../context/appContext';
import fetchData from '../../utils/fetch';
import activityWatcher from '../../utils/activityWatcher';
import { segLogin } from '../../utils/segment';
import { phLogin } from '../../utils/posthog';

// import mockUserData from '../../mocks/main.json';

function App() {
  const [showLoader, setShowLoader] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [hasIdentity, setHasIdentity] = useState(false);
  const {
    anonId,
    userData,
    userDataDispatch,
    errorDispatch,
    isAddAccountOpen,
    isAddAccountOpenDispatch,
    isPaymentOpen,
    isPaymentOpenDispatch,
    isDDOpenDispatch
  } = useContext(appContext);

  useEffect(() => {
    if (!hasIdentity && Object.keys(userData).length > 0) {
      setHasIdentity(true);

      // FullStory Identify user
      FullStoryAPI(
        'identify',
        // eslint-disable-next-line
        userData._id ? userData._id : anonId,
        {}
      );

      // SmartLook Identify user
      // eslint-disable-next-line
      smartlook('identify', userData._id ? userData._id : anonId, {
        email: userData.accountDetails ? userData.accountDetails.email : ''
      });

      // PostHog
      posthog.init('*************', {
        api_host: 'https://app.posthog.com',
        disable_session_recording: true,
        autocapture: false
        // capture_pageview: false
      });

      // PostHog Identify user
      posthog.identify(
        // eslint-disable-next-line
        userData._id ? userData._id : anonId,
        {
          email: userData.accountDetails
            ? userData.accountDetails.email
            : anonId
        },
        {}
      );
    }
  }, [userData, hasIdentity]);

  // get user data
  const onSuccess = payload => {
    userDataDispatch({ type: 'SET_USER_DATA', payload });

    setShowLoader(false);
    setAuthError(false);

    // Segment
    // eslint-disable-next-line
    segLogin(payload.accountDetails, payload._id, anonId);

    phLogin(payload.accountDetails);

    // userDataDispatch({ type: 'SET_USER_DATA', payload: mockUserData });
  };

  const onError = payload => {
    setShowLoader(false);
    setAuthError(true);
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  if (
    cookie.load('token') &&
    !cookie.load('2fa') &&
    userData &&
    Object.keys(userData).length === 0 &&
    !authError &&
    !showLoader
  ) {
    setShowLoader(true);
    fetchData('/userData/main', 'GET', onSuccess, onError);
  }

  // Update userData
  const updateUserData = () => {
    userDataDispatch({
      type: 'SET_USER_DATA',
      payload: {}
    });
  };

  useEffect(() => {
    window.addEventListener('update-userdata', updateUserData);
    return () => window.removeEventListener('update-userdata', updateUserData);
  });

  // run activityWatcher
  const logout = () => {
    cookie.remove('token');
    document.location.href = '/signin';
    posthog.reset(true);
  };

  activityWatcher(logout);

  return (
    <React.Fragment>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <SystemLayout
              userData={userData}
              anonId={anonId}
              component={<Signin />}
            />
          )}
        />
        <Route
          exact
          path="/index.html"
          render={() => (
            <SystemLayout
              userData={userData}
              anonId={anonId}
              component={<Signin />}
            />
          )}
        />
        {systemRoutes.map(item => (
          <Route
            key={item.path || new Date()}
            path={item.path}
            render={() => (
              <SystemLayout
                userData={userData}
                anonId={anonId}
                component={item.component}
              />
            )}
          />
        ))}
        {indexRoutes.map(item => (
          <Route
            key={item.path || new Date()}
            path={item.path}
            render={() => (
              <DashboardLayout
                component={item.component}
                showLoader={showLoader}
                userData={userData}
                anonId={anonId}
                isPaymentOpen={isPaymentOpen}
                isPaymentOpenDispatch={isPaymentOpenDispatch}
                isAddAccountOpen={isAddAccountOpen}
                isAddAccountOpenDispatch={isAddAccountOpenDispatch}
                isDDOpenDispatch={isDDOpenDispatch}
              />
            )}
          />
        ))}
        <Route
          render={() => (
            <SystemLayout
              userData={userData}
              anonId={anonId}
              component={<ErrorPage />}
            />
          )}
        />
      </Switch>
    </React.Fragment>
  );
}

export default App;
