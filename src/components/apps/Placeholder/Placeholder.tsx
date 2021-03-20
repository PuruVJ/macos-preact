import { motion } from 'framer-motion';
import styled from 'styled-components';
import { AppID } from '__/stores/apps.store';
import { theme } from '__/theme';

type PlaceholderAppTypes = {
  appID: AppID;
};

export const PlaceholderApp = ({ appID }: PlaceholderAppTypes) => {
  return (
    <Container>
      <Img
        initial={{ scale: 0, rotate: 180 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 20,
        }}
        draggable={false}
        src={`/assets/app-icons/${appID}/256.png`}
      />
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

const Img = styled(motion.img)`
  max-width: 8rem;
  aspect-ratio: 1 / 1;
`;
