import { FC } from 'react';
import styled from 'styled-components';
import { Window } from '../Window/Window';

export const WindowsArea: FC<{}> = ({ children }) => {
  return (
    <Container>
      <Window />
    </Container>
  );
};

const Container = styled.section`
  display: block;
`;
