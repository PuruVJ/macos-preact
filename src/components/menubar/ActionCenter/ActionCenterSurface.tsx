import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '__/theme';

interface ActionCenterSurfaceProps {
  grid: [[number, number], [number, number]];
}

export const ActionCenterSurface: FC<ActionCenterSurfaceProps> = ({ grid, children }) => {
  const [[columnStart, columnSpan], [rowStart, rowSpan]] = grid;
  return (
    <Container
      columnSpan={columnSpan}
      columnStart={columnStart}
      rowSpan={rowSpan}
      rowStart={rowStart}
    >
      {children}
    </Container>
  );
};

type ContainerProps = {
  columnStart: number;
  columnSpan: number;

  rowStart: number;
  rowSpan: number;
};

const Container = styled.section<ContainerProps>`
  display: grid;
  grid-auto-rows: 1fr;
  gap: 0.25rem;

  position: relative;

  padding: 0.5rem;

  border-radius: 0.75rem;
  box-shadow: hsla(0, 0%, 0%, 0.3) 0px 1px 4px -1px;

  background-color: hsla(${theme.colors.light.hsl}, 0.5);

  ${({ columnStart, columnSpan, rowSpan, rowStart }) => css`
    grid-column: ${columnStart} / span ${columnSpan};
    grid-row: ${rowStart} / span ${rowSpan};

    border: solid 0.4px hsla(var(--app-color-dark-hsl), 0.3);
  `};
`;
