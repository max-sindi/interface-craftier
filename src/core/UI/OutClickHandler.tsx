import React from 'react';
import classes from './OutClickHandler.module.scss'

interface IOutClickHandlerProps {
  onClick: () => void
}

const OutClickHandler = ( {onClick} : IOutClickHandlerProps ) => {
  return (
    <div className={classes.outClickHandler} onClick={onClick} />
  );
};

export default OutClickHandler;