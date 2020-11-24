import { Button } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import useSound from 'use-sound';
import StartupSound from '../../assets/sounds/mac-startup-sound.mp3';
import { Dock } from '../../components/Dock';
import { GlobalProvider } from '../../global-provider';

export function Desktop() {
  const [play] = useSound(StartupSound);

  return (
    <>
      <GlobalProvider>
        <Dock />
        <Button onClick={() => play()} variant="contained" color="primary">
          Hello
        </Button>

        <Helmet>
          <title>MacOS Web</title>
        </Helmet>
      </GlobalProvider>
    </>
  );
}
