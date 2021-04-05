import Tippy from '@tippyjs/react/headless';
import { motion, useSpring } from 'framer-motion';
import { SwitchSVG } from '__/assets/sf-icons/switch.svg';
import { TopBarIconButton } from '../TopBarIconButton';
import { ActionCenter } from './ActionCenter';

const popperOptions = {
  modifiers: [
    {
      name: 'computeStyles',
      options: {
        gpuAcceleration: false,
      },
    },
  ],
};

export const ActionCenterToggle = () => {
  const opacity = useSpring(1);

  /**
   * Don't use `.set` here, as that will trigger the animation.
   * We just want the value updated without animation
   */
  const onMount = () => opacity.updateAndNotify(1);

  const onHide = () => opacity.set(0);
  return (
    <Tippy
      trigger="focusin click"
      hideOnClick={false}
      zIndex={999999999}
      interactive
      animation={true}
      appendTo={document.body}
      onMount={onMount}
      onHide={onHide}
      render={(attrs) => (
        <motion.div initial={false} style={{ opacity }} {...attrs}>
          <ActionCenter />
        </motion.div>
      )}
      popperOptions={popperOptions}
      // If this is removed, blurry text will be there
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
