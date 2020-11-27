import { fade, makeStyles } from '@material-ui/core';
import { useMotionValue } from 'framer-motion';
import React from 'react';
import { useStore } from 'restater';
import { dockItemsStore } from '__/stores/dock.store';
import { DockItem } from './dock-item';

/**
 * The famous MacOS Dock
 */
const Dock = ({}) => {
  const classes = useStyles();
  const [dockItems] = useStore(dockItemsStore, 'dockItems');

  const mouseX = useMotionValue<number | null>(null);

  const dockItemsKeys = Object.keys(dockItems);

  return (
    <>
      <section className={classes.dockContainer}>
        <div
          className={classes.dock}
          onMouseMove={(event) => mouseX.set(event.nativeEvent.x)}
          onMouseLeave={() => mouseX.set(null)}
        >
          {dockItemsKeys.map((dockTitle) => {
            const { breakBefore } = dockItems[dockTitle];
            return [
              breakBefore && <div key={`${dockTitle}-divider`} className={classes.divider} />,
              <DockItem key={dockTitle} mouseX={mouseX} {...dockItems[dockTitle]} />,
            ];
          })}
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
    backgroundColor: fade(palette.background.default, 0.2),

    boxShadow: `inset 0 0 0 0.2px ${fade(
      palette.grey[100],
      0.3,
    )}, rgba(0, 0, 0, 0.3) 2px 5px 19px 7px`,

    padding: spacing(0.3),

    borderRadius: spacing(1.2),

    height: '100%',

    display: 'flex',
    alignItems: 'end',
  },

  divider: {
    height: '100%',
    width: '1px',
    backgroundColor: palette.grey[700],
    margin: '0 2px',
  },
}));

export { Dock };
