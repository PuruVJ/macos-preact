import clsx from 'clsx';
import { useRef, useState } from 'preact/hooks';
import { SwitchSVG } from '__/assets/sf-icons/switch.svg';
import { useOutsideClick } from '__/hooks';
import { TopBarIconButton } from '../TopBarIconButton';
import { ActionCenter } from './ActionCenter';
import css from './ActionCenterToggle.module.scss';

export const ActionCenterToggle = () => {
  const containerRef = useRef<HTMLDivElement>();
  const [state, setState] = useState<'visible' | 'hidden'>('hidden');

  useOutsideClick(containerRef, () => {
    setState('hidden');
  });

  return (
    <div className="container" ref={containerRef}>
      <span>
        <TopBarIconButton onClick={() => setState('visible')}>
          <SwitchSVG />
        </TopBarIconButton>
      </span>
      <div className={clsx(css.menuParent, state === 'hidden' && css.hidden)}>
        <ActionCenter />
      </div>
    </div>
  );
};
