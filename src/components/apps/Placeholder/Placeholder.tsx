import clsx from 'clsx';
import { motion } from 'framer-motion';
import { TrafficLights } from '__/components/Desktop/Window/TrafficLights';
import type { AppID } from '__/stores/apps.store';
import css from './Placeholder.module.scss';

type PlaceholderAppTypes = {
  appID: AppID;
};

export const PlaceholderApp = ({ appID }: PlaceholderAppTypes) => {
  return (
    <section className={clsx(css.container)}>
      <header className={clsx('app-window-drag-handle', css.titleBar)}></header>
      <section className={css.mainArea}>
        <motion.img
          className={css.img}
          initial={{ scale: 0, rotate: 180 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 250,
            damping: 20,
          }}
          draggable={false}
          src={`/assets/app-icons/${appID}/256.png`}
        />
        <h1>Apps coming soon!</h1>
      </section>
    </section>
  );
};
