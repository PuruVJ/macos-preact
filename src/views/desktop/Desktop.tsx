import { CssBaseline, makeStyles } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Dock } from '__/components/dock/Dock';
import { GlobalProvider } from '__/global-provider';
import DefaultBackground from '__/assets/wallpapers/24-0.jpg';
import { DockItemsProvider } from '__/stores/dock.store';
import { MenuBar } from '__/components/menubar/MenuBar';

export const Desktop = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <GlobalProvider>
        <main className={classes.root}>
          <MenuBar />
          <DockItemsProvider>
            <Dock />
          </DockItemsProvider>
        </main>

        <div className={classes.backgroundCover} />

        <Helmet>
          <title>MacOS Web</title>
        </Helmet>
      </GlobalProvider>
    </>
  );
};

const useStyles = makeStyles(({}) => ({
  root: {
    height: '100%',
    width: '100%',
  },

  backgroundCover: {
    height: '100%',
    width: '100%',

    zIndex: -1,
    position: 'fixed',
    top: 0,
    left: 0,

    backgroundImage: `url(${DefaultBackground})`,
    backgroundRepeat: 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));
