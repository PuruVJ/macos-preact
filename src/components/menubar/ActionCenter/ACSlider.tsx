import { Slider, SliderHandle, SliderProps, SliderRange, SliderTrack } from '@reach/slider';
import '@reach/slider/styles.css';
import { transparentize } from 'color2k';
import { FC } from 'react';
import styled from 'styled-components';
import { theme } from '__/theme';

export const ACSlider: FC<SliderProps> = ({ children, ...props }) => {
  return (
    <StyledSlider {...props}>
      <SliderTrack>
        <SliderRange>
          <SliderHandle />
        </SliderRange>
      </SliderTrack>
    </StyledSlider>
  );
};

const StyledSlider = styled(Slider)`
  --size: 1.4rem;

  [data-reach-slider-range] {
    background-color: white;
  }

  [data-reach-slider-track] {
    width: 100%;
    height: var(--size);

    border-radius: inherit;

    background-color: transparent;

    box-shadow: 0 0 0 0.35px ${transparentize(theme.colors.grey[600], 0.3)};
    border-radius: 1rem;

    background-color: hsla(${theme.colors.dark.hsl}, 0.1);
  }

  [data-reach-slider-handle] {
    height: var(--size);
    width: var(--size);

    background-color: white;

    border-radius: 50%;

    box-shadow: hsla(0, 0%, 0%, 0.3) 0px 0px 3px 1px;

    cursor: grab;
  }
`;
