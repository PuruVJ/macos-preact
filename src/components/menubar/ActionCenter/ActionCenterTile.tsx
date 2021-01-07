import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '__/theme';

interface IActionCenterSurfaceProps {
  grid: [[number, number], [number, number]];
}

export const ActionCenterSurface: FC<IActionCenterSurfaceProps> = ({ grid, children }) => {
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
  display: block;
  position: relative;

  padding: 0.5rem;

  border-radius: 0.75rem;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;

  background-color: rgba(${theme.colors.light.rgb}, 0.5);

  ${({ columnStart, columnSpan, rowSpan, rowStart }) => css`
    grid-column: ${columnStart} / span ${columnSpan};
    grid-row: ${rowStart} / span ${rowSpan};

    border: solid 0.3px rgba(var(--app-color-dark-rgb), 0.15);
  `};
`;
