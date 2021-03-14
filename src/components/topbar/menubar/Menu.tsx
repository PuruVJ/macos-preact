import { useEffect, useRef } from 'preact/hooks';
import styled, { css } from 'styled-components';
import type { IMenu } from '__/helpers/create-menu-config';
import { theme } from '__/theme';
import { ButtonBase } from '__/components/utils/ButtonBase';

type MenuProps = {
  menu: IMenu<any>;
};

export const Menu = ({ menu }: MenuProps) => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <Container ref={ref} tabIndex={-1}>
      {Object.keys(menu).map((key: any) => [
        <MenuItem key={key} disabled={menu[key].disabled}>
          {menu[key].title}
        </MenuItem>,
        menu[key].breakAfter && <Divider key={`${key}-divider`} />,
      ])}
    </Container>
  );
};

const Container = styled.div`
  display: block;

  min-width: 16rem;

  padding: 0.5rem;

  position: relative;

  user-select: none;

  background-color: hsla(${theme.colors.light.hsl}, 0.3);
  backdrop-filter: blur(25px);

  border-radius: 0.5rem;

  box-shadow: hsla(0, 0%, 0%, 0.3) 0px 0px 11px 0px;
`;

const MenuItem = styled(ButtonBase)`
  display: flex;
  justify-content: flex-start;

  width: 100%;

  padding: 0.2rem 0.4rem;

  letter-spacing: 0.4px;
  font-weight: 500 !important;
  font-size: 0.9rem;

  border-radius: 0.3rem;

  transition: none;

  color: ${({ disabled }) => `hsla(${theme.colors.dark.hsl}, ${disabled ? 0.5 : 1})`};

  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        background-color: ${theme.colors.primary.main};
        color: ${theme.colors.primary.contrast};
      }
    `}
`;

const Divider = styled.div`
  width: 100%;
  height: 0.2px;

  background-color: hsla(${theme.colors.dark.hsl}, 0.2);

  margin: 2px 0;
`;
