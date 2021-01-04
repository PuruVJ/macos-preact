import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '__/theme';

interface IActionCenterTileProps {
  columnStart: number;
  columnSpan: number;

  rowStart: number;
  rowSpan: number;
}

export const ActionCenterTile: FC<IActionCenterTileProps> = ({
  columnSpan,
  columnStart,
  rowStart,
  rowSpan,
  children,
}) => {
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

type ContainerProps = Pick<
  IActionCenterTileProps,
  'columnSpan' | 'columnStart' | 'rowSpan' | 'rowStart'
>;

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
  `};
`;
