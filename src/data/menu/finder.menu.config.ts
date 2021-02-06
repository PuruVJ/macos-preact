import { createMenuConfig } from '__/helpers/menubar';
export const finderMenuConfig = createMenuConfig({
  default: {
    title: 'hello',
    menu: {
      hi: {
        title: 'amazing',
      },
    },
  },
  file: {
    title: 'hello',
    menu: {
      wow: {
        title: 'wow',
      },
    },
  },
});
