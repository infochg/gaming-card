import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import CorneredBlock from '../../Common/CorneredBlock';

const useStyles = makeStyles(theme => ({
  categoryWrapper: {
    cursor: 'pointer',
    width: 'calc(50% - 30px)',
    display: 'inline-flex',
    margin: '0 0 80px 0',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0 0 20px 0'
    }
  },
  categoryInner: {
    width: '100%',
    minHeight: '150px',
    padding: '30px',
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.background.gray,
    border: `1px solid ${theme.palette.border.default}`,
    '& img': {
      margin: '-100px 0 -30px auto',
      maxWidth: '50%',
      maxHeight: '160px'
    }
  },
  corBlockClass: {
    width: '100%'
  },
  title: {
    fontSize: '28px',
    textAlign: 'left',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    [theme.breakpoints.down('xs')]: {
      fontSize: '21px'
    }
  }
}));

function ShopCategory(props) {
  const { item, showItems, categories } = props;
  const classes = useStyles();

  try {
    return (
      <div
        className={classes.categoryWrapper}
        role="presentation"
        onClick={() => {
          showItems(item);
        }}
      >
        <CorneredBlock subClass={classes.corBlockClass}>
          <div className={classes.categoryInner}>
            <Typography className={classes.title}>
              {categories[item].title}
            </Typography>
            <img src={categories[item].icon || ''} alt="" />
          </div>
        </CorneredBlock>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

ShopCategory.defaultProps = {
  item: undefined,
  showItems: undefined,
  categories: undefined
};

ShopCategory.propTypes = {
  item: PropTypes.string,
  showItems: PropTypes.func,
  categories: PropTypes.shape({})
};

export default ShopCategory;
