import Tippy from '@tippyjs/react/headless';
import { sticky } from 'tippy.js/headless';
import { SwitchSVG } from '__/assets/sf-icons/switch.svg';
import { TopBarIconButton } from '../TopBarIconButton';
import { ActionCenter } from './ActionCenter';

export const ActionCenterToggle = () => {
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
          <ActionCenter />
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
        <TopBarIconButton>
          <SwitchSVG />
        </TopBarIconButton>
      </span>
    </Tippy>
  );
};
