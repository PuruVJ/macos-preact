import { ButtonBase, makeStyles } from '@material-ui/core';
import React from 'react';

interface IDockItem {
  path: string;
}

function DockItem({ path }: IDockItem) {
  const classes = useStyles();

  return (
    <>
      <ButtonBase className={classes.root}>
        <img src={path} draggable={false} />
      </ButtonBase>
    </>
  );
}

const useStyles = makeStyles(({}) => ({
  root: {
    height: '100%',
    width: 'auto !important',

    '& img': {
      maxHeight: '100%',
    },
  },
}));

export { DockItem };
