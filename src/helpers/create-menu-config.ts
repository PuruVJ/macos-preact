export type IMenu<T extends {}> = {
  [key in keyof T]: {
    title: string;
    breakAfter?: boolean;
    disabled?: boolean;
    menu?: IMenu<T[key]>;
    iconComp?: JSX.Element;
  };
};

export const createMenuConfig = <T extends {}>(et: IMenu<T>) => et;
