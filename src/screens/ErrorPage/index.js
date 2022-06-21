import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Typography } from '@material-ui/core';
import ErrorBoundary from '../../containers/ErrorBoundary';

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  content: {
    flexBasis: '50%',
    '& a': {
      textDecoration: 'none'
    }
  },
  h1: {
    fontSize: '52px',
    fontWeight: '900'
  },
  text: {
    fontSize: '26px',
    color: theme.palette.text.primary,
    margin: '30px 0'
  },
  imageWrapper: {
    flexBasis: '50%',
    fontSize: '200px',
    textAlign: 'center',
    '& img': {
      maxWidth: '100%'
    }
  },
  btn: {
    borderRadius: '30px',
    paddingLeft: '40px',
    paddingRight: '40px'
  },
  [theme.breakpoints.down('sm')]: {
    contentWrapper: {
      flexDirection: 'column'
    },
    content: {
      order: '2',
      flexBasis: '100%',
      textAlign: 'center'
    },
    imageWrapper: {
      order: '1',
      flexBasis: '100%'
    }
  },
  [theme.breakpoints.down('xs')]: {
    h1: {
      fontSize: '32px'
    },
    text: {
      fontSize: '18px',
      margin: '20px 0'
    },
    imageWrapper: {
      fontSize: '100px'
    }
  }
}));

function ErrorPage() {
  const classes = useStyles();
  const history = useHistory();

  try {
    const goHome = () => {
      history.push('/');
    };

    return (
      <Container className={classes.contentWrapper}>
        <div className={classes.content}>
          <Typography className={classes.h1}>Something is wrong</Typography>
          <Typography className={classes.text}>
            The page you are looking for was moved, removed,renamed or might
            never existed
          </Typography>
          <a href="/">
            <Button
              variant="contained"
              color="primary"
              disableElevation
              className={classes.btn}
              onClick={goHome}
            >
              Go home
            </Button>
          </a>
        </div>
        <div className={classes.imageWrapper}>404</div>
      </Container>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default ErrorPage;
