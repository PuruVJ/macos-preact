export type AppConfig = {
  title: string;
  resizable: boolean;
  Component: React.ElementType;

  shouldOpenWindow?: boolean;

  /** The action to do when dock button is clicked */
  externalAction?: (e: unknown) => void;

  /** Break before this app */
  dockBreaksBefore?: boolean;
};

export const createAppConfig = (et: AppConfig) => ({
  shouldOpenWindow: true,
  dockBreaksBefore: false,
  ...et,
});
