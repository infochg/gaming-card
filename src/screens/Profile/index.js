import React, { useState, useContext } from 'react';
import cookie from 'react-cookies';
import ErrorBoundary from '../../containers/ErrorBoundary';
import PersonalInformation from '../../components/Settings/PersonalInformation';
import Profile from '../../components/Settings/Profile';
import SettingsLayout from '../../layouts/SettingsLayout';

import appContext from '../../context/appContext';
import fetchData from '../../utils/fetch';

function ProfileScreen() {
  const [pageView, setPageView] = useState('Profile');

  const [showLoader, setShowLoader] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);

  const { userData, userDataDispatch, errorDispatch } = useContext(appContext);

  const showProfile = () => {
    setPageView('Profile');
  };

  const showPersInfo = () => {
    setPageView('PersonalInformation');
  };

  // Update userData
  const onSuccess = payload => {
    setShowLoader(false);
    showProfile();
    userDataDispatch({ type: 'UPDATE_USER_DATA', payload });
  };

  const onError = payload => {
    setShowLoader(false);
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  const updateUserData = values => {
    setShowLoader(true);
    fetchData('/user/update', 'POST', onSuccess, onError, values);
  };

  // Update Email
  const onSuccessEmail = payload => {
    setShowLoader(false);
    showProfile();
    userDataDispatch({ type: 'UPDATE_USER_DATA', payload });
    setIsConfirmModal(true);
  };

  const onErrorEmail = payload => {
    setShowLoader(false);
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  const updateEmail = values => {
    setShowLoader(true);
    fetchData('/user/update', 'POST', onSuccessEmail, onErrorEmail, values);
  };

  // Logout confirmation modal
  const logout = () => {
    cookie.remove('token');
    document.location.href = '/signin';
  };

  // Toggle 2FA
  const onSuccess2FA = payload => {
    setShowLoader(false);

    const values = { ...userData };
    values.accountDetails['2fa'].enabled = payload['2fa'].enabled;

    userDataDispatch({
      type: 'UPDATE_USER_DATA',
      payload: { userData: { ...values } }
    });
  };

  const onError2FA = payload => {
    setShowLoader(false);
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  const enable2FA = () => {
    setShowLoader(true);
    fetchData('/user/2fa/enable', 'POST', onSuccess2FA, onError2FA);
  };

  const disable2FA = () => {
    setShowLoader(true);
    fetchData('/user/2fa/disable', 'POST', onSuccess2FA, onError2FA);
  };

  // Get Referral Code
  const onSuccessRefCode = payload => {
    setShowLoader(false);
    // eslint-disable-next-line
    console.log(payload);
  };

  const onErrorRefCode = payload => {
    setShowLoader(false);
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  const getRefCode = () => {
    setShowLoader(true);
    fetchData('/user/getReferralCode', 'GET', onSuccessRefCode, onErrorRefCode);
  };

  try {
    const pages = {
      Profile: (
        <Profile
          enable2FA={enable2FA}
          disable2FA={disable2FA}
          updateUserData={updateUserData}
          userData={userData}
          showPersInfo={showPersInfo}
          showLoader={showLoader}
        />
      ),
      PersonalInformation: (
        <PersonalInformation
          data={userData.accountDetails || {}}
          showProfile={showProfile}
          updateUserData={updateUserData}
          updateEmail={updateEmail}
          loading={showLoader}
          isConfirmModal={isConfirmModal}
          logout={logout}
          getRefCode={getRefCode}
        />
      )
    };

    return <SettingsLayout>{pages[pageView]}</SettingsLayout>;
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default ProfileScreen;
