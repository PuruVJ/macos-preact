import { FC, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '__/hooks/use-theme';
import type { TTheme } from '__/stores/theme.store';
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

type IContainer = { theme: TTheme };

const Container = styled.section<IContainer>`
  display: block;

  width: 19.5rem;

  position: relative;

  user-select: none;

  background-color: hsla(${theme.colors.light.hsl}, 0.3);
  backdrop-filter: blur(12px);

  border-radius: 1rem;

  ${(props) =>
    css`
      box-shadow: hsla(0, 0%, 0%, 0.3) 0px 0px 11px 0px,
        0 0 0 ${props.theme === 'dark' ? 0.5 : 0}px hsla(${theme.colors.dark.hsl}, 0.3);
    `}

  padding: 0.75rem;
`;
