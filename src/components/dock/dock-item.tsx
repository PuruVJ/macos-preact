import { ButtonBase, makeStyles } from '@material-ui/core';
import Tippy from '@tippyjs/react';
import React from 'react';
import 'tippy.js/dist/tippy.css';
import type { IDockItem } from '__/stores/dock.store';

interface IDockItemProps extends IDockItem {}

function DockItem({ icon, action, appName }: IDockItemProps) {
  const classes = useStyles();

  const ref = React.useRef<HTMLButtonElement>(null);

  function getCommon(e: React.MouseEvent) {
    let previousButton = ref.current?.previousElementSibling;
    let nextButton = ref.current?.nextElementSibling;

    if (previousButton?.tagName === 'DIV') previousButton = previousButton.previousElementSibling;
    if (nextButton?.tagName === 'DIV') nextButton = nextButton.nextElementSibling;

    return { nextButton, previousButton };
  }

  function handleMouseOver(e: React.MouseEvent) {
    let { previousButton, nextButton } = getCommon(e);

    nextButton?.classList.add('secondary-hover');
    previousButton?.classList.add('secondary-hover');
  }

  function handleMouseOut(e: React.MouseEvent) {
    let { previousButton, nextButton } = getCommon(e);

    nextButton?.classList.remove('secondary-hover');
    previousButton?.classList.remove('secondary-hover');
  }

  return (
    <>
      <Tippy content={<span>{appName}</span>}>
        <ButtonBase
          ref={ref}
          onMouseOut={handleMouseOut}
          onMouseOver={handleMouseOver}
          onClick={action}
          className={classes.root}
        >
          <img src={icon} draggable={false} />
        </ButtonBase>
      </Tippy>
    </>
  );
}

const useStyles = makeStyles(({}) => ({
  root: {
    height: '100%',
    width: 'auto !important',

    cursor: 'default',

    transition: 'all 200ms ease-in',

    transformOrigin: 'bottom',

    '& img': {
      maxHeight: '100%',
    },

    '&.secondary-hover': {
      transform: 'scale(1.2)',

      margin: `0 ${(10 * 1.3) / 1.5}px`,
    },

    '&:hover': {
      transform: 'scale(1.5)',

      margin: '0 10px',
    },
  },
}));

export { DockItem };
