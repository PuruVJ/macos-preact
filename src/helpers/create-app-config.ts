export type IAppConfig = {
  title: string;
  resizable: boolean;
  Component: React.ElementType;

  shouldOpenWindow?: boolean;
  /** The action to do when dock button is clicked */
  externalAction?: (e: any) => void;

  /** Break before this app */
  dockBreaksBefore?: boolean;
};

export const createAppConfig = (et: IAppConfig) => ({
  shouldOpenWindow: true,
  dockBreaksBefore: false,
  ...et,
});
