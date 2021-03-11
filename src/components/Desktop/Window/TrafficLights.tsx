import { useImmerAtom } from 'jotai/immer';
import styled from 'styled-components';
import { ButtonBase } from '__/components/utils/ButtonBase';
import { openAppsStore, TApp } from '__/stores/apps.store';

type TrafficLightProps = {
  appID: TApp;
};

export const TrafficLights = ({ appID }: TrafficLightProps) => {
  const [, setOpenApps] = useImmerAtom(openAppsStore);

  function closeApp() {
    setOpenApps((openApps) => {
      openApps[appID] = false;
      return openApps;
    });
  }

  return (
    <Container>
      <CloseLight onClick={() => closeApp()} />
      <StretchLight />
      <MinimizeLight />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;

  height: 100%;
`;

const TrafficLight = styled(ButtonBase)`
  --size: 0.78rem;
  height: var(--size);
  width: var(--size);

  border-radius: 50%;
`;

const CloseLight = styled(TrafficLight)`
  background-color: #ff5f56;
  border: solid 0.5px #e0443e;
`;

const StretchLight = styled(TrafficLight)`
  background-color: #ffbd2e;
  border: solid 0.5px #dea123;
`;

const MinimizeLight = styled(TrafficLight)`
  background-color: #27c93f;
  border: solid 0.5px #1aab29;
`;
