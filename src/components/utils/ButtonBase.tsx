import styled, { StyledComponentProps } from 'styled-components';

interface IButtonBaseProps {}

export const ButtonBase = ({
  children,
  ...props
}: StyledComponentProps<'button', any, IButtonBaseProps, never>) => {
  return <_Button {...props}>{children}</_Button>;
};

const _Button = styled.button<IButtonBaseProps>`
  color: inherit;
  text-decoration: none;
  vertical-align: middle;

  border: 0;
  border-radius: 0;

  outline: 0;

  margin: 0;
  padding: 0;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  position: relative;

  user-select: none;

  appearance: none;

  background-color: transparent;

  -webkit-tap-highlight-color: transparent;

  &:not(:disabled) {
    cursor: pointer;
  }
`;
