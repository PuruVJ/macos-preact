import { useImmerAtom } from 'jotai/immer';
import { useMemo } from 'preact/compat';
import styled from 'styled-components';
import { appsConfig } from '__/data/apps/apps-config';
import { openAppsStore } from '__/stores/apps.store';
import { Window } from '../Window/Window';

export const WindowsArea: {} = ({}) => {
  const [openApps] = useImmerAtom(openAppsStore);

  const appIDList = useMemo(() => Object.keys(appsConfig) as (keyof typeof appsConfig)[], []);

  return (
    <Container>
      {appIDList.map((appID) => openApps[appID] && <Window key={appID} appID={appID} />)}
    </Container>
  );
};

const Container = styled.section`
  display: block;
`;
