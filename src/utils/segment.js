import Analytics from 'analytics-node';

let key = '*********';
if (process.env.NODE_ENV === 'development') {
  key = '*********';
}

const analytics = new Analytics(key);

export const segChangePage = (pathname, id, anonId) => {
  const message = {
    properties: {
      path: pathname
    }
  };

  if (id) {
    message.userId = id;
  } else {
    message.anonymousId = anonId;
  }

  analytics.page({ ...message });
};

export const segRegStart = (data, id, anonId) => {
  const messageIdent = {
    traits: {
      email: data && data.email ? data.email : ''
    }
  };

  const messageTrack = {
    event: 'Registration - started'
  };

  if (id) {
    messageIdent.userId = id;
    messageTrack.userId = id;
  } else {
    messageIdent.anonymousId = anonId;
    messageTrack.anonymousId = anonId;
  }

  analytics.identify({ ...messageIdent });
  analytics.track({ ...messageTrack });
};

export const segRegComplStep = (data, id, anonId) => {
  const messageTrack = {
    event: 'Registration - completed a step',
    properties: {
      step: data.step || ''
    }
  };

  if (id) {
    messageTrack.userId = id;
  } else {
    messageTrack.anonymousId = anonId;
  }

  analytics.track({ ...messageTrack });
};

export const segRegEnd = (data, id, anonId) => {
  const messageIdent = {
    traits: {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      phone: data.mobileNumber || ''
    }
  };

  const messageTrack = {
    event: 'Registration - finished'
  };

  if (id) {
    messageIdent.userId = id;
    messageTrack.userId = id;
  } else {
    messageIdent.anonymousId = anonId;
    messageTrack.anonymousId = anonId;
  }

  analytics.identify({ ...messageIdent });
  analytics.track({ ...messageTrack });
};

export const segLogin = (data, id, anonId) => {
  const messageIdent = {
    traits: {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      phone: data.mobileNumber || ''
    }
  };

  const messageTrack = {
    event: 'Login'
  };

  if (id) {
    messageIdent.userId = id;
    messageTrack.userId = id;
  } else {
    messageIdent.anonymousId = anonId;
    messageTrack.anonymousId = anonId;
  }

  analytics.identify({ ...messageIdent });
  analytics.track({ ...messageTrack });
};

export const segTransferStart = (data, id, anonId) => {
  const messageTrack = {
    event: 'Transfer - started',
    properties: {
      ...data
    }
  };

  if (id) {
    messageTrack.userId = id;
  } else {
    messageTrack.anonymousId = anonId;
  }

  analytics.track({ ...messageTrack });
};

export const segTransferFinished = (data, id, anonId) => {
  const messageTrack = {
    event: 'Transfer - successful',
    properties: {
      ...data
    }
  };

  if (id) {
    messageTrack.userId = id;
  } else {
    messageTrack.anonymousId = anonId;
  }

  analytics.track({ ...messageTrack });
};

export const claimChallenge = (data, id, anonId) => {
  const messageTrack = {
    event: 'Claim a completed challenge',
    properties: {
      ...data
    }
  };

  if (id) {
    messageTrack.userId = id;
  } else {
    messageTrack.anonymousId = anonId;
  }

  analytics.track({ ...messageTrack });
};

export const connectPlaidStart = (id, anonId) => {
  const messageTrack = {
    event: 'Connect a Plaid account - started'
  };

  if (id) {
    messageTrack.userId = id;
  } else {
    messageTrack.anonymousId = anonId;
  }

  analytics.track({ ...messageTrack });
};

export const connectPlaidFinished = (id, anonId) => {
  const messageTrack = {
    event: 'Connect a Plaid account - success'
  };

  if (id) {
    messageTrack.userId = id;
  } else {
    messageTrack.anonymousId = anonId;
  }

  analytics.track({ ...messageTrack });
};

export const segIDVerifStart = (id, anonId) => {
  const messageTrack = {
    event: 'Vouched, ID verification - started'
  };

  if (id) {
    messageTrack.userId = id;
  } else {
    messageTrack.anonymousId = anonId;
  }

  analytics.track({ ...messageTrack });
};

export const segIDVerifManualReview = (id, anonId) => {
  const messageTrack = {
    event: 'Vouched, ID verification - manual review'
  };

  if (id) {
    messageTrack.userId = id;
  } else {
    messageTrack.anonymousId = anonId;
  }

  analytics.track({ ...messageTrack });
};

export const segIDVerifManualRejected = (id, anonId) => {
  const messageTrack = {
    event: 'Vouched, ID verification - rejected'
  };

  if (id) {
    messageTrack.userId = id;
  } else {
    messageTrack.anonymousId = anonId;
  }

  analytics.track({ ...messageTrack });
};

export const segAddPromo = (data, id, anonId) => {
  const messageTrack = {
    event: 'Added Promo Code',
    properties: {
      ...data
    }
  };

  if (id) {
    messageTrack.userId = id;
  } else {
    messageTrack.anonymousId = anonId;
  }

  analytics.track({ ...messageTrack });
};

export const segPinwheelStart = (id, anonId) => {
  const messageTrack = {
    event: 'Pinwheel, connect account - started'
  };

  if (id) {
    messageTrack.userId = id;
  } else {
    messageTrack.anonymousId = anonId;
  }

  analytics.track({ ...messageTrack });
};

export const segPinwheelSuccess = (id, anonId) => {
  const messageTrack = {
    event: 'Pinwheel, connect account - success'
  };

  if (id) {
    messageTrack.userId = id;
  } else {
    messageTrack.anonymousId = anonId;
  }

  analytics.track({ ...messageTrack });
};
