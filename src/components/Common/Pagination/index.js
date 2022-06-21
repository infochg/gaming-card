import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBoundary from '../../../containers/ErrorBoundary';

import corner from '../../../assets/img/top-corner-no-dot.svg';
import cornerDark from '../../../assets/img/top-corner-dark.svg';

const useStyles = makeStyles(theme => ({
  pagination: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    '& ul': {
      display: 'flex',
      width: '100%',
      margin: '20px auto 30px auto',
      padding: '0',
      '& li': {
        listStyle: 'none',
        margin: '0 2px',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          zIndex: '2',
          top: '0',
          left: '0',
          width: '8px',
          height: '8px',
          background: `url(${corner}) no-repeat center`,
          backgroundSize: '100% 100%',
          transform: 'rotate(270deg)'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          zIndex: '2',
          bottom: '0',
          left: '0',
          width: '8px',
          height: '8px',
          background: `url(${corner}) no-repeat center`,
          backgroundSize: '100% 100%',
          transform: 'rotate(180deg)'
        },
        '&.prevLink': {
          marginRight: 'auto'
        },
        '&.nextLink': {
          marginLeft: 'auto'
        },
        '& a': {
          fontSize: '16px',
          fontFamily: 'Oswald',
          color: theme.palette.text.lightGray,
          cursor: 'pointer',
          background: theme.palette.background.gray,
          border: `1px solid ${theme.palette.border.default}`,
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all .2s',
          position: 'relative',
          zIndex: '1',
          '&::before': {
            content: '""',
            position: 'absolute',
            zIndex: '2',
            top: '-1px',
            right: '-1px',
            width: '8px',
            height: '8px',
            background: `url(${corner}) no-repeat center`,
            backgroundSize: '100% 100%'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            zIndex: '2',
            bottom: '-1px',
            right: '-1px',
            width: '8px',
            height: '8px',
            background: `url(${corner}) no-repeat center`,
            backgroundSize: '100% 100%',
            transform: 'rotate(90deg)'
          },
          '&:hover': {
            background: 'rgba(255,255,255,0.2)'
          }
        },
        '&.selected': {
          '&::before': {
            background: `url(${cornerDark}) no-repeat center`,
            backgroundSize: '100% 100%'
          },
          '&::after': {
            background: `url(${cornerDark}) no-repeat center`,
            backgroundSize: '100% 100%'
          },
          '& a': {
            background: theme.palette.text.lightGray,
            color: '#fff',
            borderColor: theme.palette.text.lightGray,
            '&::before': {
              background: `url(${cornerDark}) no-repeat center`,
              backgroundSize: '100% 100%'
            },
            '&::after': {
              background: `url(${cornerDark}) no-repeat center`,
              backgroundSize: '100% 100%'
            },
            '&:hover': {
              color: theme.palette.text.lightGray
            }
          }
        },
        '&.disabled': {
          opacity: '0',
          visibility: 'hidden',
          cursor: 'default'
        }
      }
    }
  }
}));

const Pagination = props => {
  const { inputData, setCurContent, itemsPerPage } = props;
  const classes = useStyles();
  const [pageCount, setPageCount] = useState(1);
  const [perPage] = useState(itemsPerPage || 10);

  useEffect(() => {
    if (inputData && inputData.length > perPage) {
      setPageCount(Math.ceil(inputData.length / perPage));
    }
  }, [inputData]);

  useEffect(() => {
    if (pageCount > 1) {
      setCurContent(inputData.slice(0, perPage));
    }
  }, [pageCount, inputData]);

  try {
    const handlePageClick = pageData => {
      if (pageData.selected === 0) {
        setCurContent(inputData.slice(0, perPage));
      } else if (pageData.selected === pageCount - 1) {
        setCurContent(inputData.slice(pageData.selected * perPage));
      } else {
        setCurContent(
          inputData.slice(
            pageData.selected * perPage,
            (pageData.selected + 1) * perPage
          )
        );
      }
    };

    return (
      pageCount > 1 && (
        <div className={classes.pagination}>
          <ReactPaginate
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            previousLabel="<"
            nextLabel=">"
            previousClassName="prevLink"
            nextClassName="nextLink"
          />
        </div>
      )
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
};

Pagination.defaultProps = {
  inputData: undefined,
  setCurContent: undefined,
  itemsPerPage: undefined
};

Pagination.propTypes = {
  inputData: PropTypes.arrayOf(PropTypes.shape({})),
  setCurContent: PropTypes.func,
  itemsPerPage: PropTypes.number
};

export default Pagination;
