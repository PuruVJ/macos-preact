import { useEffect, useCallback, useState } from 'preact/hooks';

const useContextMenu = (outerRef: any) => {
  const [xPos, setXPos] = useState('0px');
  const [yPos, setYPos] = useState('0px');
  const [menu, showMenu] = useState(false);

  const handleContextMenu = useCallback(
    (event: any) => {
      event.preventDefault();
      if (outerRef && outerRef.current.contains(event.target)) {
        let x = event.pageX;
        let y = event.pageY;
        if (window.innerWidth - x < 250) {
          x = x - 250;
        }
        if (window.innerHeight - y < 300) {
          y = y - 250;
        }
        setXPos(`${x}px`);
        setYPos(`${y}px`);
        showMenu(true);
      } else {
        showMenu(false);
      }
    },
    [showMenu, outerRef, setXPos, setYPos],
  );

  const handleClick = useCallback(() => {
    showMenu(false);
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return { xPos, yPos, menu };
};

export default useContextMenu;
