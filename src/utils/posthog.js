import posthog from 'posthog-js';

export const phChangePage = () => {
  posthog.capture('$pageview');
};

export const phRegStart = data => {
  posthog.capture('Registration - started', {
    $set_once: {
      email: data && data.email ? data.email : ''
    }
  });
};

export const phRegComplStep = data => {
  posthog.capture('Registration - completed a step', {
    $set: {
      step: data.step || ''
    }
  });
};

export const phRegEnd = data => {
  posthog.capture('Registration - finished', {
    $set_once: {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      phone: data.mobileNumber || ''
    }
  });
};

export const phLogin = data => {
  posthog.capture('Login', {
    $set_once: {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      phone: data.mobileNumber || ''
    }
  });
};

export const phTransferStart = data => {
  posthog.capture('Transfer - started', {
    $set_once: { ...data }
  });
};

export const phTransferFinished = data => {
  posthog.capture('Transfer - successful', {
    $set_once: { ...data }
  });
};

export const phClaimChallenge = data => {
  posthog.capture('Claim a completed challenge', {
    $set_once: { ...data }
  });
};

export const phConnectPlaidStart = () => {
  posthog.capture('Connect a Plaid account - started');
};

export const phConnectPlaidFinished = () => {
  posthog.capture('Connect a Plaid account - success');
};

export const phIDVerifStart = () => {
  posthog.capture('Vouched, ID verification - started');
};

export const phIDVerifManualReview = () => {
  posthog.capture('Vouched, ID verification - manual review');
};

export const phIDVerifRejected = () => {
  posthog.capture('Vouched, ID verification - rejected');
};

export const phAddPromo = data => {
  posthog.capture('Added Promo Code', {
    $set_once: { ...data }
  });
};

export const phPinwheelStart = () => {
  posthog.capture('Pinwheel, connect account - started');
};

export const phPinwheelSuccess = () => {
  posthog.capture('Pinwheel, connect account - success');
};
