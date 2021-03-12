import styled from 'styled-components';
import { theme } from '__/theme';

export const PlaceholderApp = ({}) => {
  return (
    <Container>
      <img draggable={false} src="/assets/app-icons/finder/128.png" />
      <h1>Apps coming soon!</h1>
    </Container>
  );
};

const Container = styled.section`
  font-size: 1.618rem;
  color: ${theme.colors.light.contrast};

  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
