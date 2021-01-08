import React, { FC, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '__/hooks/use-theme';
import { theme } from '__/theme';

interface IMenuShell {}

export const MenuShell: FC<IMenuShell> = ({ children }) => {
  const ref = useRef<HTMLElement | null>(null);
  const [theme] = useTheme();

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <Container theme={theme} ref={ref} tabIndex={-1}>
      {children}
    </Container>
  );
};

type IContainer = { theme: 'light' | 'dark' };

const Container = styled.section<IContainer>`
  display: block;

  width: 19.5rem;

  position: relative;

  user-select: none;

  background-color: hsla(${theme.colors.light.hsl}, 0.3);
  backdrop-filter: blur(12px);

  box-shadow: hsla(0, 0%, 0%, 0.3) 0px 0px 11px 0px;
  border-radius: 1rem;

  ${(props) =>
    props.theme === 'dark' &&
    css`
      border: solid 0.5px hsla(var(--app-color-dark-hsl), 0.3);
    `}

  padding: 0.75rem;
`;
