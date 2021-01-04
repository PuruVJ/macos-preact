import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { theme } from '__/theme';

interface IMenuShell {}

export const MenuShell: FC<IMenuShell> = ({ children }) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <MenuShellContainer ref={ref} tabIndex={-1}>
      {children}
    </MenuShellContainer>
  );
};

const MenuShellContainer = styled.section`
  display: block;

  width: 18rem;

  position: relative;

  background-color: rgba(${theme.colors.light.rgb}, 0.3);
  backdrop-filter: blur(12px);

  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 11px 0px;
  border-radius: 1rem;

  padding: 0.75rem;
`;
