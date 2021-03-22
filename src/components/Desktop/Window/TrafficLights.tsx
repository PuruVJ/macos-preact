import { useImmerAtom } from 'jotai/immer';
import styled from 'styled-components';
import { ButtonBase } from '__/components/utils/ButtonBase';
import { openAppsStore, AppID } from '__/stores/apps.store';

type TrafficLightProps = {
  appID: AppID;
};

export const TrafficLights = ({ appID }: TrafficLightProps) => {
  const [, setOpenApps] = useImmerAtom(openAppsStore);

  const closeApp = () =>
    setOpenApps((openApps) => {
      openApps[appID] = false;
      return openApps;
    });

  return (
    <Container>
      <CloseLight onClick={closeApp} />
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
  --size: 0.79rem;
  height: var(--size);
  width: var(--size);

  border-radius: 50%;
`;

const CloseLight = styled(TrafficLight)`
  background-color: #ff5f56;
  box-shadow: 0 0 0 0.5px #e0443e;
`;

const StretchLight = styled(TrafficLight)`
  background-color: #ffbd2e;
  box-shadow: 0 0 0 0.5px #dea123;
`;

const MinimizeLight = styled(TrafficLight)`
  background-color: #27c93f;
  box-shadow: 0 0 0 0.5px #1aab29;
`;
