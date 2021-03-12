import { ComponentChildren } from 'preact';
import styled, { css } from 'styled-components';
import { theme } from '__/theme';

interface IActionCenterTileProps {
  grid: [number, number];
  children: ComponentChildren;
}

export const ActionCenterTile = ({ grid, children }: IActionCenterTileProps) => {
  return <Container grid={grid}>{children}</Container>;
};

type ContainerProps = Pick<IActionCenterTileProps, 'grid'>;

const Container = styled.div<ContainerProps>`
  display: flex;
  gap: 0.4rem;
  align-items: center;

  cursor: default !important;

  font-size: 0.85rem;
  font-weight: 600;
  color: ${theme.colors.dark.main};

  ${({ grid }) => css`
    grid-row: ${grid[0]} / span ${grid[1]};
  `};
`;
