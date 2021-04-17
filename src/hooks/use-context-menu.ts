import { useEffect, useCallback, useState } from "preact/hooks";

const useContextMenu = outerRef => {
  const [xPos, setXPos] = useState("0px");
  const [yPos, setYPos] = useState("0px");
  const [menu, showMenu] = useState(false);

  const handleContextMenu = useCallback(
    event => {
      event.preventDefault();
      if (outerRef && outerRef.current.contains(event.target)) {
        let x = event.pageX
        let y = event.pageY
        if(window.innerWidth - x < 150){
          console.log("runs x")
          x = x - 250
        }
        if(window.innerHeight - y < 150){
          console.log("runs y")
          y = y - 200
        }
        setXPos(`${x}px`);
        setYPos(`${y}px`);
        showMenu(true);
      } else {
        showMenu(false);
      }
    },
    [showMenu, outerRef, setXPos, setYPos]
  );

  const handleClick = useCallback(() => {
    showMenu(false);
  }, [showMenu]);

  useEffect(() => {
    
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return { xPos, yPos, menu };
};

export default useContextMenu;