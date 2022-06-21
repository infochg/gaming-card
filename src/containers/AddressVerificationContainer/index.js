import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Typography } from '@material-ui/core';
import * as SmartyStreetsSDK from 'smartystreets-javascript-sdk';
import Preloader from '../../components/Common/Preloader';
import CustomTextField from '../../components/Common/TextField';
import SelectField from '../../components/Common/SelectField';
import CustButton from '../../components/Common/Button';
import Icon from '../../components/Common/Icon';

import noResults from '../../assets/img/no-results-ico.svg';

const SmartyStreetsCore = SmartyStreetsSDK.core;
// eslint-disable-next-line
const Lookup = SmartyStreetsSDK.usAutocompletePro.Lookup;
const websiteKey = process.env.REACT_APP_SMARTY_WEBSITE_KEY;
const smartyStreetsSharedCredentials = new SmartyStreetsCore.SharedCredentials(
  websiteKey
);
// const autoCompleteClientBuilder = new SmartyStreetsCore.ClientBuilder(
//   smartyStreetsSharedCredentials
// );

const clientBuilder = new SmartyStreetsCore.ClientBuilder(
  smartyStreetsSharedCredentials
).withLicenses(['us-autocomplete-pro-cloud']);

const client = clientBuilder.buildUsAutocompleteProClient();

const useStyles = makeStyles(theme => ({
  form: {
    position: 'relative',
    textAlign: 'center',
    maxWidth: '450px'
  },
  switchWrapper: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center'
  },
  btn: {
    maxWidth: '100%',
    margin: '20px 0'
  },
  flexBox: {
    display: 'flex'
  },
  bigBox: {
    width: '60%',
    paddingRight: '25px'
  },
  smallBox: {
    width: '40%'
  },
  sugLine: {
    borderBottom: `1px solid ${theme.palette.border.default}`,
    padding: '5px 0',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all .2s',
    background: 'transparent',
    '&:hover': {
      background: theme.palette.background.purpleWithOp
    }
  },
  streetLine: {
    fontSize: '16px',
    fontWeight: '700'
  },
  fullAddress: {
    fontSize: '14px',
    color: theme.palette.text.lightGray
  },
  pinIcon: {
    height: '24px',
    marginRight: '15px'
  },
  arrowUpLeft: {
    height: '24px',
    marginLeft: 'auto'
  },
  orText: {
    fontSize: '18px'
  },
  asLink: {
    fontSize: '16px',
    color: theme.palette.text.purple,
    textDecoration: 'underline',
    cursor: 'pointer',
    marginBottom: '50px',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  noResultsBlock: {
    margin: '10px auto'
  },
  noResultsTitle: {
    color: theme.palette.text.lightGray,
    fontFamily: 'Oswald',
    fontSize: '20px',
    textTransform: 'uppercase'
  },
  noResultsText: {
    color: theme.palette.text.lightGray,
    fontSize: '16px'
  },
  noResultsLink: {
    whiteSpace: 'nowrap',
    fontSize: '16px',
    color: theme.palette.text.purple,
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none'
    }
  }
}));

const statesArray = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY'
];

const state = statesArray.map(item => {
  return { key: item, value: item };
});

function AddressVerificationContainer(props) {
  const classes = useStyles();

  const { address, submitAddress, loading, isRegistration } = props;
  const [addressData, setAddressData] = useState({
    city: address && address.city ? address.city : '',
    state: address && address.state ? address.state : 'AL',
    street: address && address.street ? address.street : '',
    unit: address && address.unit ? address.unit : '',
    zip: address && address.zip ? address.zip : ''
  });
  const [isZipValid, setIsZipValid] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [showManualText, setShowManualText] = useState(true);

  const sendData = data => {
    submitAddress({ address: data });
  };

  const handleSubmit = e => {
    e.preventDefault();
    sendData(addressData);
  };

  // Zip validation
  useEffect(() => {
    if (addressData.zip !== '') {
      if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(addressData.zip)) {
        setIsZipValid(true);
      } else {
        setIsZipValid(false);
      }
    } else {
      setIsZipValid(false);
    }
  }, [addressData.zip]);

  // Suggestions
  const [suggestions, setSuggestions] = useState(null);
  const [sugLoading, setSugLoading] = useState(false);

  const getAddress = () => {
    setSugLoading(true);
    setShowManualText(false);
    // const lookup = new SmartyStreetsSDK.usAutocomplete.Lookup(
    //   addressData.street
    // );
    //
    // autoCompleteClientBuilder
    //   .buildUsAutocompleteClient()
    //   .send(lookup)
    //   .then(response => {
    //     setSuggestions(response.result);
    //     setSugLoading(false);
    //   })
    //   // eslint-disable-next-line
    //   .catch(console.warn);

    const lookup = new Lookup(addressData.street);

    client
      .send(lookup)
      .then(results => {
        setSuggestions(results.result);
        setSugLoading(false);
      })
      // eslint-disable-next-line
      .catch(console.log);
  };

  const changeAddress = value => {
    const newAddressData = { ...addressData };

    if (value.streetLine) {
      newAddressData.street = value.streetLine;
    }
    if (value.state) {
      newAddressData.state = value.state;
    }
    if (value.city) {
      newAddressData.city = value.city;
    }
    if (value.state) {
      newAddressData.state = value.state;
    }
    if (value.zipcode) {
      newAddressData.zip = value.zipcode;
    }

    setAddressData(newAddressData);
    setIsManual(true);
  };

  // Changing all fields
  const changeField = e => {
    if (e && e.target) {
      if (
        e.target.name === 'street' ||
        e.target.name === 'city' ||
        e.target.name === 'state' ||
        e.target.name === 'unit'
      ) {
        const newAddressData = { ...addressData };

        if (e.target.name === 'street' || e.target.name === 'unit') {
          if (e.target.value.length < 36) {
            newAddressData[e.target.name] = e.target.value;
            setAddressData(newAddressData);
          }
        } else if (e.target.name === 'city') {
          if (e.target.value.length < 19) {
            newAddressData[e.target.name] = e.target.value;
            setAddressData(newAddressData);
          }
        } else {
          newAddressData[e.target.name] = e.target.value;
          setAddressData(newAddressData);
        }

        if (e.target.name === 'street') {
          if (e.target.value.length > 5) {
            getAddress();
          }
        }
      } else if (e.target.name === 'zip') {
        if (!/[^0-9]/.test(e.target.value) && e.target.value.length < 6) {
          const newAddressData = { ...addressData };
          newAddressData[e.target.name] = e.target.value;
          setAddressData(newAddressData);
        }
      }
    }
  };

  return (
    <React.Fragment>
      <div className={classes.form}>
        <form onSubmit={handleSubmit}>
          {isRegistration && !isManual && (
            <React.Fragment>
              <CustomTextField
                name="street"
                value={addressData.street}
                label="Street"
                onChange={changeField}
                variant="outlined"
                fullWidth
              />
              {sugLoading && <Preloader />}
              {suggestions && suggestions.length === 0 && (
                <div className={classes.noResultsBlock}>
                  <img src={noResults} alt="" />
                  <Typography className={classes.noResultsTitle}>
                    No results found
                  </Typography>
                  <Typography className={classes.noResultsText}>
                    We couldn’t find your what you want.
                    <br /> Please try to{' '}
                    <span
                      className={classes.noResultsLink}
                      role="presentation"
                      onClick={() => setIsManual(true)}
                    >
                      enter your address manually
                    </span>
                  </Typography>
                </div>
              )}
              {suggestions && suggestions.length > 0 && (
                <div className={classes.sugWrapper}>
                  {suggestions.map(item => {
                    return (
                      <div
                        key={item.text}
                        role="presentation"
                        onClick={() => changeAddress(item)}
                        className={classes.sugLine}
                      >
                        <Icon icon="pin" className={classes.pinIcon} />
                        <div>
                          <div className={classes.streetLine}>
                            {item.streetLine}
                          </div>
                          <div className={classes.fullAddress}>
                            {item.city}, {item.state}
                          </div>
                        </div>
                        <Icon
                          icon="arrowUpLeft"
                          className={classes.arrowUpLeft}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </React.Fragment>
          )}
          {(isManual || !isRegistration) && (
            <React.Fragment>
              <div className={classes.flexBox}>
                <div className={classes.bigBox}>
                  <CustomTextField
                    name="street"
                    value={addressData.street}
                    label="Street"
                    onChange={changeField}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className={classes.smallBox}>
                  <CustomTextField
                    name="unit"
                    value={addressData.unit}
                    label="Unit"
                    onChange={changeField}
                    variant="outlined"
                    fullWidth
                  />
                </div>
              </div>
              <div className={classes.flexBox}>
                <div className={classes.bigBox}>
                  <CustomTextField
                    name="city"
                    value={addressData.city}
                    label="City"
                    onChange={changeField}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className={classes.smallBox}>
                  <CustomTextField
                    name="zip"
                    value={addressData.zip}
                    label="ZIP code"
                    onChange={changeField}
                    variant="outlined"
                    fullWidth
                  />
                </div>
              </div>
              <SelectField
                label="State"
                name="state"
                variant="outlined"
                type="text"
                onChange={changeField}
                fullWidth
                value={addressData.state}
              >
                {state.map(item => (
                  <MenuItem key={item.key} value={item.key}>
                    {item.value}
                  </MenuItem>
                ))}
              </SelectField>
            </React.Fragment>
          )}
          {!loading ? (
            <CustButton
              type="submit"
              subclass={classes.btn}
              btnstyle={isRegistration ? 'system' : ''}
              disabled={
                addressData.city === '' ||
                addressData.state === '' ||
                addressData.street === '' ||
                !isZipValid
              }
            >
              {isRegistration ? 'Continue' : 'Update Address'}
            </CustButton>
          ) : (
            <Preloader />
          )}
          {showManualText && (
            <div className={classes.manualWrapper}>
              <Typography className={classes.orText}>or</Typography>
              <Typography
                className={classes.asLink}
                role="presentation"
                onClick={() => setIsManual(true)}
              >
                Enter address manually
              </Typography>
            </div>
          )}
        </form>
      </div>
    </React.Fragment>
  );
}

AddressVerificationContainer.propTypes = {
  address: PropTypes.shape({
    city: PropTypes.string,
    state: PropTypes.string,
    street: PropTypes.string,
    unit: PropTypes.string,
    zip: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  submitAddress: PropTypes.func,
  loading: PropTypes.bool,
  isRegistration: PropTypes.bool
};

AddressVerificationContainer.defaultProps = {
  address: undefined,
  submitAddress: undefined,
  loading: undefined,
  isRegistration: undefined
};

export default AddressVerificationContainer;
