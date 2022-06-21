import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBoundary from '../../../containers/ErrorBoundary';

const useStyles = makeStyles(theme => ({
  footerWrapper: {
    padding: '5px 0',
    fontWeight: '400',
    fontSize: '12px',
    color: theme.palette.text.lightGray
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 30px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      textAlign: 'center'
    }
  },
  menu: {
    margin: '0 0 0 auto',
    padding: '0',
    display: 'flex',
    listStyle: 'none',
    '& li': {
      padding: '0 10px'
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0',
      textAlign: 'center',
      padding: '10px 0'
    }
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    opacity: '0.7',
    transition: 'all 0.2s',
    '&:hover': {
      opacity: '1'
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      padding: '10px 0'
    }
  }
}));

function Footer() {
  const classes = useStyles();

  try {
    return (
      <div className={classes.footerWrapper}>
        <div className={classes.container}>
          <div className={classes.copy}>
            © 2020 Mythia - All Rights Reserved.
          </div>
          <ul className={classes.menu}>
            <li>
              <a
                href="https://help.mythia.com/en/"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
              >
                Help
              </a>
            </li>
            <li>
              <a
                href="https://mythia.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="https://mythia.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
              >
                Terms
              </a>
            </li>
            <li>
              <a
                href="https://mythia.com/official-rules"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
              >
                Contest Rules
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default Footer;
