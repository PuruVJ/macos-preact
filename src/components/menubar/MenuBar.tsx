import { ButtonBase, fade, makeStyles } from '@material-ui/core';
import { mdiApple, mdiAppleAirplay, mdiWifiStrength4 } from '@mdi/js';
import React from 'react';
import { SwitchSVG } from '__/assets/sf-icons/switch.svg';
import { VolumeLowSVG } from '__/assets/sf-icons/volume-low.svg';
import { AppIcon } from '../utils/app-icons';
import { MenuBarTime } from './MenuBarTime';

const MenuBar = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <>
      <header className={classes.root}>
        <ButtonBase className={classes.appleButton}>
          <AppIcon size={18} path={mdiApple} />
        </ButtonBase>
        <ButtonBase style={{ fontWeight: 600, margin: `0 6px` }}>Finder</ButtonBase>

        {/* menu buttons */}
        <ButtonBase className={classes.menuButton}>File</ButtonBase>
        <ButtonBase className={classes.menuButton}>Edit</ButtonBase>
        <ButtonBase className={classes.menuButton}>View</ButtonBase>
        <ButtonBase className={classes.menuButton}>Go</ButtonBase>
        <ButtonBase className={classes.menuButton}>Window</ButtonBase>
        <ButtonBase className={classes.menuButton}>Help</ButtonBase>

        <span className={classes.flex}></span>

        <ButtonBase className={classes.iconButtons}>
          <AppIcon size={24} path={mdiAppleAirplay} />
        </ButtonBase>

        <ButtonBase className={classes.iconButtons}>
          <AppIcon size={24} path={mdiWifiStrength4} />
        </ButtonBase>

        <ButtonBase className={classes.iconButtons}>
          <VolumeLowSVG />
        </ButtonBase>

        <ButtonBase className={classes.iconButtons}>
          <SwitchSVG />
        </ButtonBase>

        <ButtonBase>
          <MenuBarTime />
        </ButtonBase>
      </header>
    </>
  );
};

const useStyles = makeStyles(({ spacing, palette, typography }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',

    width: '100%',
    height: spacing(1.4),

    backgroundColor: fade(palette.background.default, 0.3),
    backdropFilter: 'blur(6px)',

    color: palette.text.primary,
    fill: palette.text.primary,

    '& button': {
      fontWeight: '500',
      fontSize: spacing(0.8),
      fontFamily: typography.fontFamily,

      position: 'relative',

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
    margin: spacing(0, 0.6),
  },

  flex: {
    flex: '1 1 auto',
  },

  iconButtons: {
    maxHeight: '100%',

    margin: `${spacing(0, 0.5)} !important`,

    '& svg, & svg path': {
      height: spacing(1),
      width: 'auto',

      fill: `${palette.text.primary} !important`,

      position: 'relative',
    },
  },
}));

export { MenuBar };

