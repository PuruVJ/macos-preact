import clsx from 'clsx';
import css from './VSCode.module.scss';

type VSCodeProps = {
  isBeingDragged: boolean;
};

export const VSCode = ({ isBeingDragged }: VSCodeProps) => {
  return (
    <section className={css.container}>
      <header className={clsx(css.header, 'app-window-drag-handle')}></header>
      <div>
        <iframe
          className={clsx(css.iframe, isBeingDragged && css.iframeDragged)}
          src="https://github1s.com/puruvj/macos-web"
        />
      </div>
    </section>
  );
};
