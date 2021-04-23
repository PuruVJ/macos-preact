import { RefObject } from 'preact';
import { Ref, useEffect, useRef } from 'preact/hooks';
import { ButtonBase } from '__/components/utils/ButtonBase';
import { contextMenuConfig } from '__/data/menu/context.menu.config';
import { useContextMenu } from '__/hooks';
import css from './ContextMenu.module.scss';

type Props = {
  outerRef: RefObject<HTMLDivElement>;
};

export const ContextMenu = ({ outerRef }: Props) => {
  const { xPos, yPos, isMenuVisible } = useContextMenu(outerRef);

  const containerRef = useRef<HTMLDivElement>();

  const defMenu = contextMenuConfig.default;

  useEffect(() => {
    isMenuVisible && containerRef.current.focus();
  }, [isMenuVisible]);

  return isMenuVisible ? (
    <div
      class={css.contextContainer}
      tabIndex={-1}
      onBlur={() => console.log('fddg')}
      ref={containerRef}
      style={{ top: yPos, left: xPos }}
    >
      {Object.keys(defMenu).map((key) => (
        <>
          <ButtonBase class={css.menuItem}>{defMenu[key].title}</ButtonBase>
          {(defMenu[key] as any).breakAfter && <div class={css.divider}></div>}
        </>
      ))}
    </div>
  ) : (
    <></>
  );
};

function useFocusOutside<T extends HTMLElement>(ref: Ref<T>) {}
