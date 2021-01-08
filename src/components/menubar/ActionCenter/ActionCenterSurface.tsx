import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '__/hooks/use-theme';
import { theme } from '__/theme';

interface ActionCenterSurfaceProps {
  grid: [[number, number], [number, number]];
}

export const ActionCenterSurface: FC<ActionCenterSurfaceProps> = ({ grid, children }) => {
  const [[columnStart, columnSpan], [rowStart, rowSpan]] = grid;
  const [theme] = useTheme();

  return (
    <Container
      columnSpan={columnSpan}
      columnStart={columnStart}
      rowSpan={rowSpan}
      rowStart={rowStart}
      theme={theme}
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

  theme: 'light' | 'dark';
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

  ${({ columnStart, columnSpan, rowSpan, rowStart, theme }) => css`
    grid-column: ${columnStart} / span ${columnSpan};
    grid-row: ${rowStart} / span ${rowSpan};

    border: solid ${theme === 'dark' ? 0.4 : 0}px hsla(var(--app-color-dark-hsl), 0.3);
  `};
`;
