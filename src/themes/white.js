import { createTheme } from '@material-ui/core/styles';

import BarlowRegular2 from '../assets/fonts/Barlow-Regular.woff2';
import BarlowMedium2 from '../assets/fonts/Barlow-Medium.woff2';
import BarlowBold2 from '../assets/fonts/Barlow-Bold.woff2';
import OswaldRegular2 from '../assets/fonts/Oswald-Regular.woff2';
import OswaldMedium2 from '../assets/fonts/Oswald-Medium.woff2';
import OswaldBold2 from '../assets/fonts/Oswald-Bold.woff2';

const barlow = {
  fontFamily: 'Barlow',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Barlow'),
    local('Barlow-Regular'),
    url(${BarlowRegular2}) format('woff2')
  `
};

const barlowMedium = {
  fontFamily: 'Barlow',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `
    local('Barlow'),
    local('Barlow-Medium'),
    url(${BarlowMedium2}) format('woff2')
  `
};

const barlowBold = {
  fontFamily: 'Barlow',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 700,
  src: `
    local('Barlow'),
    local('Barlow-Bold'),
    url(${BarlowBold2}) format('woff2')
  `
};

const oswald = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Oswald'),
    local('Oswald-Regular'),
    url(${OswaldRegular2}) format('woff2')
  `
};

const oswaldMedium = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `
    local('Oswald'),
    local('Oswald-Medium'),
    url(${OswaldMedium2}) format('woff2')
  `
};

const oswaldBold = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 700,
  src: `
    local('Oswald'),
    local('Oswald-Bold'),
    url(${OswaldBold2}) format('woff2')
  `
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#342472'
    },
    background: {
      default: '#fff',
      gray: '#F0F4F9',
      grayWithOp: 'rgba(212, 222, 232, 0.5)',
      darkGray: '#C4C4C4',
      lightGray: '#768BA1',
      red: '#B92941',
      redWithOp: '#f8eaec',
      lightRed: '#BE3D53',
      purple: '#4835BE',
      lightPurple: '#dfe1f2',
      purpleWithOp: 'rgba(72, 53, 190, 0.1)',
      green: '#42C867',
      likeBorder: '#D4DEE8',
      orange: '#FFAE02'
    },
    border: {
      default: '#D4DEE8',
      defaultWithOp: 'rgba(72, 53, 190, 0.2)',
      red: '#BE3D53',
      purple: '#4835BE',
      purpleWithOp: '#AFA9E3'
    },
    text: {
      primary: '#2E2A3E',
      darkPurple: '#342472',
      purple: '#4835BE',
      lightPurple: '#7C76A1',
      lightGray: '#768BA1',
      red: '#BE3D53',
      darkRed: '#B92941',
      blue: '#49A0EC',
      gray: '#A4A4A4'
    }
  },
  typography: {
    fontFamily: 'Barlow',
    fontSize: 18,
    color: '#fff'
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [
          barlow,
          barlowMedium,
          barlowBold,
          oswald,
          oswaldMedium,
          oswaldBold
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
        backgroundColor: '#fff',
        borderRadius: '20px !important',
        border: '1px solid rgba(255,255,255,0.1)'
      }
    }
  }
});

export default theme;
