import { FC } from 'react';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';
import { theme } from '__/theme';
import { TrafficLights } from './TrafficLights';

type TWindow = {};

export const Window: FC<TWindow> = ({ children }) => {
  return (
    <Rnd
      default={{
        height: 600,
        width: '50%',
        x: (document.body.clientWidth - 800) / 2,
        y: 100 / 2,
      }}
      dragHandleClassName="app-window-drag-handle"
      bounds="parent"
      minWidth="200"
      minHeight="200"
    >
      <Container>
        <TaskBar className="app-window-drag-handle">
          <TrafficLights />
        </TaskBar>
        <Divider />
        {children}
      </Container>
    </Rnd>
  );
};

const Container = styled.section`
  width: 100%;
  height: 100%;

  background-color: ${theme.colors.light.main};

  position: relative;

  border-radius: 0.75rem;
  box-shadow: 0 0.3px 1.9px rgba(0, 0, 0, 0.021), 0 0.8px 4.5px rgba(0, 0, 0, 0.03),
    0 1.5px 8px rgba(0, 0, 0, 0.037), 0 2.4px 13.3px rgba(0, 0, 0, 0.043),
    0 4px 22px rgba(0, 0, 0, 0.05), 0 6.9px 38.4px rgba(0, 0, 0, 0.059),
    0 15px 83px rgba(0, 0, 0, 0.08);
`;

const TaskBar = styled.header`
  height: 2.5rem;
  width: 100%;

  padding: 0 0.75rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 0.2px;

  background-color: hsla(${theme.colors.dark.hsl}, 0.2);
`;
