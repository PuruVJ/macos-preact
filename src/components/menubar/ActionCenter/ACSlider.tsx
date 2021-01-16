import { transparentize } from 'color2k';
import React, { FC, HTMLProps } from 'react';
import ReactSlider, { ReactSliderProps } from 'react-slider';
import styled from 'styled-components';
import { theme } from '__/theme';

export const ACSlider: FC<ReactSliderProps> = ({ children, ...props }) => {
  return <Slider renderTrack={Track} renderThumb={Thumb} {...props}></Slider>;
};

const pickTrackColor = (index: number) => ['white', 'transparent'][index];

const Slider = styled(ReactSlider)`
  --size: 1.4rem;
  width: 100%;
  height: var(--size);

  box-shadow: 0 0 0 0.35px ${transparentize(theme.colors.grey[600], 0.3)};
  border-radius: 1rem;

  background-color: hsla(${theme.colors.dark.hsl}, 0.1);
`;

const StyledTrack = styled.div<State>`
  height: inherit;

  background-color: ${({ index }) => pickTrackColor(index)};

  border-radius: inherit;
`;

const StyledThumb = styled.div<State>`
  height: var(--size);
  width: var(--size);

  background-color: white;

  border-radius: 50%;

  box-shadow: hsla(0, 0%, 0%, 0.3) 0px 0px 3px 1px;

  cursor: grab;

  /* margin-left: calc(-1 * var(--size)); */
`;

interface State {
  index: number;
  value: number | number[];
}
const Track = (props: HTMLProps<HTMLDivElement>, state: State) => (
  // @ts-ignore
  <StyledTrack {...props} index={state.index} />
);

const Thumb = (props: HTMLProps<HTMLDivElement>, state: State) => (
  // @ts-ignore
  <StyledThumb {...props} />
);
