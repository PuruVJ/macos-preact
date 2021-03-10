import { useImmerAtom } from 'jotai/immer';
import { FC } from 'react';
import styled from 'styled-components';
import { appsConfig } from '__/data/apps/apps-config';
import { openAppsStore, TApp } from '__/stores/apps.store';
import { Window } from '../Window/Window';

export const WindowsArea: FC<{}> = ({}) => {
  const [openApps] = useImmerAtom(openAppsStore);

  return (
    <Container>
      {Object.keys(appsConfig)
        // @ts-ignore
        .map((appID: TApp) => openApps[appID] && <Window key={appID} appID={appID} />)}
    </Container>
  );
};

const Container = styled.section`
  display: block;
`;
