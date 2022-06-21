import { createMuiTheme } from '@material-ui/core/styles';

import MontserratRegular2 from '../assets/fonts/Montserrat-Regular.woff2';
import MontserratMedium2 from '../assets/fonts/Montserrat-Medium.woff2';
import MontserratSemiBold2 from '../assets/fonts/Montserrat-SemiBold.woff2';
import MontserratBold2 from '../assets/fonts/Montserrat-Bold.woff2';
import RobotoRegular2 from '../assets/fonts/Roboto-Regular.woff2';
import RobotoBold2 from '../assets/fonts/Roboto-Bold.woff2';

const montserrat = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Montserrat'),
    local('Montserrat-Regular'),
    url(${MontserratRegular2}) format('woff2')
  `
};

const montserratMedium = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `
    local('Montserrat'),
    local('Montserrat-Medium'),
    url(${MontserratMedium2}) format('woff2')
  `
};

const montserratSemiBold = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 600,
  src: `
    local('Montserrat'),
    local('Montserrat-SemiBold'),
    url(${MontserratSemiBold2}) format('woff2')
  `
};

const montserratBold = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 700,
  src: `
    local('Montserrat'),
    local('Montserrat-Bold'),
    url(${MontserratBold2}) format('woff2')
  `
};

const roboto = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Roboto'),
    local('Roboto-Regular'),
    url(${RobotoRegular2}) format('woff2')
  `
};

const robotoBold = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 700,
  src: `
    local('Roboto'),
    local('Roboto-Bold'),
    url(${RobotoBold2}) format('woff2')
  `
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#342472'
    },
    background: {
      default: 'transparent'
    },
    text: {
      primary: '#fff',
      secondary: '#FF9E2C',
      disabled: '#AFAABC'
    }
  },
  typography: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    color: '#fff'
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [
          roboto,
          robotoBold,
          montserrat,
          montserratMedium,
          montserratSemiBold,
          montserratBold
        ]
      }
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        padding: '11px 30px'
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: '#343055',
        borderRadius: '20px !important',
        border: '1px solid rgba(255,255,255,0.1)'
      }
    }
  }
});

export default theme;
