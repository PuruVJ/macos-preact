import { FC } from 'react';
import styled from 'styled-components';
import { ButtonBase } from '__/components/utils/ButtonBase';

export const TrafficLights: FC<{}> = ({}) => {
  return (
    <Container>
      <CloseLight />
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
  background-color: #ff605c;
`;

const StretchLight = styled(TrafficLight)`
  background-color: #ffbd44;
`;

const MinimizeLight = styled(TrafficLight)`
  background-color: #00ca4e;
`;
