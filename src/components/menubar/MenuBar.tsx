import { ButtonBase, fade, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { AppIcon } from '../utils/app-icons';
import { mdiApple } from '@mdi/js';

const MenuBar = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <>
      <header className={classes.root}>
        <ButtonBase className={classes.appleButton}>
          <AppIcon size={18} path={mdiApple} />
        </ButtonBase>
        <ButtonBase style={{fontWeight: 600, margin: `0 6px`}}>Finder</ButtonBase>

        {/* menu buttons */}
        <ButtonBase className={classes.menuButton}>File</ButtonBase>
        <ButtonBase className={classes.menuButton}>Edit</ButtonBase>
        <ButtonBase className={classes.menuButton}>View</ButtonBase>
        <ButtonBase className={classes.menuButton}>Go</ButtonBase>
        <ButtonBase className={classes.menuButton}>Window</ButtonBase>
        <ButtonBase className={classes.menuButton}>Help</ButtonBase>
      </header>
    </>
  );
};

const useStyles = makeStyles(({ spacing, palette, typography }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',

    width: '100%',
    height: spacing(1.3),

    backgroundColor: fade(palette.background.default, 0.3),
    backdropFilter: 'blur(6px)',

    color: palette.text.primary,
    fill: palette.text.primary,

    '& button': {
      fontWeight: '400',
      fontSize: typography.subtitle2.fontSize,
      fontFamily: typography.fontFamily,

      padding: spacing(0, 0.2),
      margin: spacing(0, 0.3),
    },
  },

  menuButton: {
    fontWeight: 500,
  },

  appleButton: {
    borderRadius: '30px',

    padding: spacing(0, 0.5),
    margin: spacing(0, 0.5),
  },

  flex: {
    flex: '1 1 auto',
  },
}));

export { MenuBar };
