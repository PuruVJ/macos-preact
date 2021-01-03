import styled from 'styled-components';
import { theme } from '__/theme';
import { ButtonBase } from '../utils/ButtonBase';

export const MenuIconButton = styled(ButtonBase)`
  max-height: 100%;

  margin: 0 0.5rem !important;

  svg,
  svg path {
    height: 1rem;
    width: 1rem;

    fill: ${theme.colors.light.contrast} !important;

    position: relative;
  }
`;
