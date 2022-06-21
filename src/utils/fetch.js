import cookie from 'react-cookies';

const fetchData = async (link, method, onSuccess, onError, args) => {
  try {
    const resData = await fetch(`${process.env.REACT_APP_API_URL}${link}`, {
      method,
      headers: {
        'Content-Type': method !== 'GET' ? 'application/json' : null,
        Authorization: cookie.load('token') || ''
      },
      body: method !== 'GET' && args ? JSON.stringify({ ...args }) : null
    }).then(response => {
      if (
        (response.status >= 200 && response.status < 300) ||
        response.status === 'success'
      ) {
        return response.json();
      }

      return null;
    });

    if ((resData === null || resData.status === 'failed') && onError) {
      onError(resData.message || 'Something is wrong, please try later.');
    } else if (onSuccess) {
      onSuccess(resData);
    }

    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    // console.log(error);

    fetchData('/admin/saveErrorLog', 'POST', undefined, undefined, {
      log: `API: ${link}, error: ${error}, data: ${
        args ? JSON.stringify({ ...args }) : null
      }`
    });

    if (onError) {
      onError('Something is wrong, please try later.');
    }
  }

  return null;
};

export default fetchData;
