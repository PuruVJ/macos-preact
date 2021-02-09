type IMenu<T> = {
  [key in keyof T]: {
    title: string;
    breakAfter?: boolean;
    disabled?: boolean;
    menu?: IMenu<T[key]>;
    iconComp?: JSX.Element;
  };
};

export const createMenuConfig = <T>(et: IMenu<T>) => et;
