import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import moment from 'moment';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Pagination from '../../Common/Pagination';
import CustButton from '../../Common/Button';

import store from '../../../assets/img/store-ico.svg';

import { splitAmount } from '../../../utils/helpers';

const useStyles = makeStyles(theme => ({
  title: {
    margin: '0 0 10px 0',
    fontSize: '28px',
    textAlign: 'left',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase'
  },
  contentBlock: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    width: '100%',
    border: '1px solid rgba(255,255,255,0.1)',
    margin: '0 0 40px 0'
  },
  transactions: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    textAlign: 'left'
  },
  transaction: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    margin: '10px 0'
  },
  topLine: {
    borderTop: `1px solid ${theme.palette.border.default}`
  },
  transactionDate: {
    fontSize: '18px',
    fontWeight: '400',
    fontFamily: 'Oswald',
    padding: '20px 0',
    color: theme.palette.text.lightGray,
    textTransform: 'uppercase'
  },
  transactionData: {
    display: 'block',
    width: '100%'
  },
  transactionItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 0'
  },
  descWrapper: {
    textAlign: 'left',
    width: '100%',
    paddingRight: '5px'
  },
  desc: {
    fontSize: '16px',
    fontWeight: '700',
    width: '100%'
  },
  type: {
    fontSize: '12px',
    textAlign: 'left'
  },
  amount: {
    fontFamily: 'Oswald',
    fontSize: '24px',
    margin: '0 0 0 auto',
    fontWeight: '700',
    whiteSpace: 'nowrap',
    '& span': {
      fontSize: '16px',
      fontWeight: '400'
    }
  },
  img: {
    width: '40px',
    minWidth: '40px',
    height: '40px',
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholder: {
    fontSize: '15px',
    opacity: '0.7'
  },
  btns: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    margin: '0 0 40px 0',
    padding: '0'
  },
  btnsItem: {
    width: '327px !important',
    maxWidth: '45% !important'
  }
}));

const status = {
  hold: 'Hold',
  deposit: 'Deposit',
  pendingdeposit: 'Pending Deposit',
  withdrawal: '',
  hold_release: ''
};

function TransactionsList(props) {
  const { transactions, handleOpenPayment, cardStatus } = props;
  const classes = useStyles();
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [curContent, setCurContent] = useState([]);

  // Filter transactions by date
  const getCorrectDate = item => moment(item).format('ddd, MMMM DD YYYY');

  useEffect(() => {
    const tempTransactions = [];
    transactions.reverse().map(item => {
      const curDate = getCorrectDate(item.date);

      const curDateIndex = tempTransactions.findIndex(
        filItem => getCorrectDate(filItem.date) === curDate
      );

      if (curDateIndex === -1) {
        tempTransactions.push({
          date: curDate,
          transactions: [{ ...item }]
        });
      } else {
        const curTransactions = tempTransactions[curDateIndex].transactions;
        curTransactions.push({ ...item });

        tempTransactions[curDateIndex] = {
          date: curDate,
          transactions: curTransactions
        };
      }

      tempTransactions
        .sort((a, b) => {
          return moment(a.date) - moment(b.date);
        })
        .reverse();

      return null;
    });

    setFilteredTransactions(tempTransactions);
    setCurContent(tempTransactions);
  }, [transactions, setFilteredTransactions, setCurContent]);

  try {
    return (
      <div className={classes.contentBlock}>
        <Typography className={classes.title}>Transactions</Typography>
        <div className={classes.btns}>
          {cardStatus === 'active' && (
            <CustButton
              onClick={() => handleOpenPayment('withdraw')}
              subclass={classes.btnsItem}
            >
              Withdraw
            </CustButton>
          )}
          <CustButton
            onClick={() => handleOpenPayment('deposit')}
            subclass={classes.btnsItem}
            style={{ display: 'none' }}
          >
            Deposit
          </CustButton>
        </div>
        <div className={classes.transactions}>
          {curContent.length > 0 ? (
            curContent.map(item => {
              return (
                <div className={classes.transaction} key={shortid.generate()}>
                  <Typography className={classes.transactionDate}>
                    {item.date}
                  </Typography>
                  <div className={classes.transactionData}>
                    {item.transactions
                      .sort((a, b) => {
                        if (a.id.slice(4) > b.id.slice(4)) {
                          return 1;
                        }
                        if (a.id.slice(1) < b.id.slice(4)) {
                          return -1;
                        }
                        return 0;
                      })
                      .map((trans, index) => {
                        return (
                          <div
                            key={shortid.generate()}
                            className={`${classes.transactionItem} ${
                              index !== 0 ? classes.topLine : ''
                            }`}
                          >
                            <div className={classes.img}>
                              <img src={store} alt="" />
                            </div>
                            <div className={classes.deskWrapper}>
                              <Typography className={classes.desc}>
                                {trans.desc}
                              </Typography>
                              <Typography className={classes.type}>
                                {status[trans.type] || trans.type}
                              </Typography>
                            </div>
                            <Typography className={classes.amount}>
                              {splitAmount(trans.amount)}
                            </Typography>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })
          ) : (
            <Typography className={classes.placeholder}>
              You don&lsquo;t have transactions yet.
            </Typography>
          )}

          <Pagination
            inputData={filteredTransactions}
            setCurContent={setCurContent}
            itemsPerPage={5}
          />
        </div>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

TransactionsList.defaultProps = {
  transactions: undefined,
  handleOpenPayment: undefined,
  cardStatus: undefined
};

TransactionsList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({})),
  handleOpenPayment: PropTypes.func,
  cardStatus: PropTypes.string
};

export default TransactionsList;
