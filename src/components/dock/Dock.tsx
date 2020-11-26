import { fade, makeStyles } from '@material-ui/core';
import React from 'react';
import { useStore } from 'restater';
import { DockItemsStore } from '__/stores/dock.store';
import { DockItem } from './dock-item';

/**
 * The famous MacOS Dock
 */
const Dock = ({}) => {
  const classes = useStyles();
  const [dockItems] = useStore(DockItemsStore, 'dockItems');

  const dockItemsKeys = Object.keys(dockItems);

  return (
    <>
      <section className={classes.dockContainer}>
        <div className={classes.dock}>
          {dockItemsKeys.map((dockTitle) => (
            <DockItem path={dockItems[dockTitle].icon} />
          ))}
        </div>
      </section>
    </>
  );
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  dockContainer: {
    position: 'fixed',
    bottom: spacing(0.3),
    left: 0,
    zIndex: 999999999999999,

    width: '100%',
    height: spacing(5),

    padding: spacing(0.4),

    display: 'flex',
    justifyContent: 'center',
  },

  dock: {
    backdropFilter: 'blur(5px)',
    backgroundColor: fade(palette.background.default, 0.1),

    boxShadow: `inset 0 0 0 0.2px ${fade(
      palette.grey[100],
      0.3,
    )}, rgba(0, 0, 0, 0.3) 2px 5px 19px 7px`,

    padding: spacing(0.3),

    borderRadius: spacing(1),

    height: '100%',
  },
}));

export { Dock };
