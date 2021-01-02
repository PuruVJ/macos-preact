import React from 'react';
import styled, { StyledComponentProps } from 'styled-components';

interface IButtonBaseProps {}

export const ButtonBase: React.FC<StyledComponentProps<'button', any, IButtonBaseProps, never>> = ({
  children,
  ...props
}) => {
  return <_Button {...props}>{children}</_Button>;
};

const _Button = styled.button`
  color: inherit;
  text-decoration: none;
  vertical-align: middle;

  border: 0;
  border-radius: 0;

  cursor: pointer;

  margin: 0;
  padding: 0;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  outline: 0;

  position: relative;

  user-select: none;

  appearance: none;

  background-color: transparent;

  -webkit-tap-highlight-color: transparent;
`;
