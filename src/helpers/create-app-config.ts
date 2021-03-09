type IAppConfig = {
  title: string;
  resizable: boolean;
  component: React.ReactNode;
};

export const createAppConfig = (et: IAppConfig) => et;
