import { createAppConfig } from '__/helpers/create-app-config';

export const calculatorAppConfig = createAppConfig({
  title: 'Calculator',

  height: 300 * 1.414,
  width: 300,

  trafficLightsStyle: {
    top: '0.7rem',
    left: '0.7rem',
  },
});
