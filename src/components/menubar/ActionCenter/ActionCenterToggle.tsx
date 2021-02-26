import Tippy from '@tippyjs/react/headless';
import { sticky } from 'tippy.js/headless';
import { FC } from 'react';
import { SwitchSVG } from '__/assets/sf-icons/switch.svg';
import { MenuIconButton } from '../MenuIconButton';
import { ActionCenter } from './ActionCenter';

interface IActionCenterToggle {}

export const ActionCenterToggle: FC<IActionCenterToggle> = ({}) => {
  return (
    <Tippy
      trigger="focusin click"
      hideOnClick={false}
      sticky
      zIndex={999999999}
      plugins={[sticky]}
      interactive
      appendTo={document.body}
      render={(attrs) => (
        <div {...attrs}>
          <ActionCenter>Hello</ActionCenter>
        </div>
      )}
      // If this is removed, blurry text will be there
      popperOptions={{
        modifiers: [
          {
            name: 'computeStyles',
            options: {
              gpuAcceleration: false,
            },
          },
        ],
      }}
      onClickOutside={({ hide }) => hide()}
    >
      <span>
        <MenuIconButton>
          <SwitchSVG />
        </MenuIconButton>
      </span>
    </Tippy>
  );
};
