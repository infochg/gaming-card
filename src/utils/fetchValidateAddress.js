import cookie from 'react-cookies';
import fetchData from './fetch';

const fetchValidateAddress = async (
  onSuccess,
  onError,
  onNeedValidation,
  data
) => {
  try {
    const resData = await fetch(
      `${process.env.REACT_APP_API_URL}user/validateAddress`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: cookie.load('token') || ''
        },
        body: JSON.stringify({ address: data })
      }
    ).then(response => {
      if (
        (response.status >= 200 && response.status < 300) ||
        response.status === 'valid' ||
        response.status === 'changeRequested'
      ) {
        return response.json();
      }

      return null;
    });

    if (resData === null) {
      if (onError) {
        onError('Address is incorrect, please, check it and try again.');
      }
    } else if (resData.status === 'failed') {
      if (onNeedValidation) {
        onNeedValidation('failed');
      }
    } else if (resData.status === 'valid') {
      if (onSuccess) {
        onSuccess();
      }
    } else if (resData.status === 'changeRequested') {
      if (onNeedValidation) {
        onNeedValidation('changeRequested', resData.suggestedAddress || {});
      }
    }

    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    // console.log(error);

    fetchData('/admin/saveErrorLog', 'POST', undefined, undefined, {
      log: `API: user/validateAddress, error: ${error}, data: ${
        data ? JSON.stringify({ ...data }) : null
      }`
    });

    onError('Something is wrong, please try later.');
  }

  return null;
};

export default fetchValidateAddress;
