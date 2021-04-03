import { useEffect } from 'preact/hooks';
import { StartupChime } from '__/components/Desktop/StartupChime';
import { WindowsArea } from '__/components/Desktop/Window/WindowsArea';
import { Dock } from '__/components/dock/Dock';
import { TopBar } from '__/components/topbar/TopBar';
import { useTheme } from '__/hooks/use-theme';
import css from './Desktop.module.scss';

const DarkBackground = '/assets/wallpapers/3-1.jpg';
const LightBackground = '/assets/wallpapers/3-2.jpg';

export const Desktop = () => {
  const [theme] = useTheme();

  useEffect(() => {
    preloadImage(DarkBackground);
    preloadImage(LightBackground);
  }, []);

  return (
    <>
      <StartupChime />

      <main className={css.main}>
        <TopBar />
        <WindowsArea />
        <Dock />
      </main>

      <div
        className={css.backgroundCover}
        style={
          {
            '--bgurl': `url(${theme === 'light' ? LightBackground : DarkBackground})`,
          } as React.CSSProperties
        }
        aria-hidden="true"
      />
    </>
  );
};

function preloadImage(path: string) {
  const img = new Image();
  img.src = path;
}
