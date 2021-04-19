import clsx from 'clsx';
import css from './VSCode.module.scss';

export const VSCode = () => {
  return (
    <section className={css.container}>
      <header className={clsx(css.header, 'app-window-drag-handle')}></header>
      <div>
        <iframe className={css.iframe} src="https://github1s.com/puruvj/macos-web" />
      </div>
    </section>
  );
};
