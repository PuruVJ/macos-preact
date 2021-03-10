type IAppConfig = {
  title: string;
  resizable: boolean;
  component: React.ElementType;
};

export const createAppConfig = (et: IAppConfig) => et;
