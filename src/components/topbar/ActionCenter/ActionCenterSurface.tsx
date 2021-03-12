import { ComponentChildren } from 'preact';
import styled, { css } from 'styled-components';
import { useTheme } from '__/hooks/use-theme';
import type { TTheme } from '__/stores/theme.store';
import { theme } from '__/theme';

interface ActionCenterSurfaceProps {
  grid: [[number, number], [number, number]];
  children: ComponentChildren;
}

export const ActionCenterSurface = ({ grid, children }: ActionCenterSurfaceProps) => {
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

  theme: TTheme;
};

const Container = styled.section<ContainerProps>`
  display: grid;
  grid-auto-rows: 1fr;
  gap: 0.25rem;

  position: relative;

  padding: 0.5rem;

  border-radius: 0.75rem;

  background-color: hsla(${theme.colors.light.hsl}, 0.5);

  ${({ columnStart, columnSpan, rowSpan, rowStart, theme: localTheme }) => css`
    grid-column: ${columnStart} / span ${columnSpan};
    grid-row: ${rowStart} / span ${rowSpan};

    box-shadow: hsla(0, 0%, 0%, 0.3) 0px 1px 4px -1px,
      0 0 0 ${localTheme === 'dark' ? 0.4 : 0}px hsla(${theme.colors.dark.hsl}, 0.3);
  `};
`;
