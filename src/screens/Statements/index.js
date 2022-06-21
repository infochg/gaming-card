import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import shortid from 'shortid';
import ErrorBoundary from '../../containers/ErrorBoundary';
import Preloader from '../../components/Common/Preloader';
import StatementItem from '../../components/Statements/StatementItem';
import SettingsLayout from '../../layouts/SettingsLayout';
import Modal from '../../components/Common/Modal';
import appContext from '../../context/appContext';
import fetchData from '../../utils/fetch';
import noResults from '../../assets/img/no-results-ico.svg';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  lContentWrapper: {
    width: '100%',
    maxWidth: '670px',
    '& img': {
      maxWidth: '100%',
      [theme.breakpoints.down('md')]: {
        maxWidth: '200px'
      }
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: '30px'
    }
  },
  noDocs: {
    textAlign: 'center'
  },
  noDocsText: {
    fontSize: '18px',
    paddingRight: '10px',
    fontWeight: '400',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px'
    }
  }
}));

function Statements() {
  const classes = useStyles();
  const [showLoader, setShowLoader] = useState(false);
  const [showItemLoader, setShowItemLoader] = useState(false);

  const { statements, statementsDispatch, errorDispatch } = useContext(
    appContext
  );

  // get statements
  const onSuccessStatementsList = payload => {
    setShowLoader(false);
    statementsDispatch({
      type: 'SET_STATEMENTS',
      payload: payload.statements || []
    });
  };

  const onErrorStatementsList = payload => {
    setShowLoader(false);
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  useEffect(() => {
    if (!statements) {
      setShowLoader(true);
      fetchData(
        '/user/getStatements',
        'GET',
        onSuccessStatementsList,
        onErrorStatementsList
      );
    }
  }, [statements]);

  // Open statement
  const openStatement = pdfBase64 => {
    const w = window.open('about:blank');

    const iframe = w.document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    setTimeout(() => {
      w.document.body.appendChild(
        iframe
      ).src = `data:application/pdf;base64,${pdfBase64}`;
    }, 0);
  };

  try {
    const closeLoadingModal = () => {
      setShowItemLoader(false);
    };

    return (
      <SettingsLayout>
        <div className={classes.wrapper}>
          <div className={classes.lContentWrapper}>
            {!showLoader ? (
              <React.Fragment>
                {statements && statements.length > 0 ? (
                  statements.map(item => {
                    return (
                      <StatementItem
                        key={shortid.generate()}
                        openStatement={openStatement}
                        date={item.date}
                        pdfBase64={item.pdfBase64}
                      />
                    );
                  })
                ) : (
                  <div className={classes.noDocs}>
                    <img src={noResults} alt="" />
                    <Typography className={classes.noDocsText}>
                      Your statement will be available after your first month.
                    </Typography>
                  </div>
                )}
              </React.Fragment>
            ) : (
              <Preloader />
            )}
            <Modal
              isOpened={showItemLoader}
              closeModal={closeLoadingModal}
              content={<Preloader />}
              noBtns
              noCloseBtn
            />
          </div>
        </div>
      </SettingsLayout>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default Statements;
