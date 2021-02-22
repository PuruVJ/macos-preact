import { RefObject, useEffect, useState } from 'react';

type Boundary = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

type Options<DragTarget> = {
  defaultOffset: { x: number; y: number };
  defaultSize: { width: number; height: number };
  boundary: Boundary;
  resizable: boolean;
  resizeThreshold: number;
  constraintSize: number;
  dragRef: RefObject<DragTarget>;
};

function useElementResize<
  TargetElement extends HTMLElement = HTMLElement,
  DragTarget extends HTMLElement = HTMLElement
>(ref: RefObject<TargetElement>, options: Options<DragTarget>) {
  const {
    defaultOffset,
    defaultSize,
    boundary,
    resizable = true,
    resizeThreshold = 10,
    constraintSize = 200,
  } = options;
  const [offset, setOffset] = useState(defaultOffset);
  const [size, setSize] = useState(defaultSize);
  const cursorPos = useCursor(ref, resizeThreshold, resizable);
  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    const dragTarget = options.dragRef && options.dragRef.current;
    const cover = document.createElement('div');
    cover.style.position = 'fixed';
    cover.style.top = '0';
    cover.style.left = '0';
    cover.style.right = '0';
    cover.style.bottom = '0';
    const previousOffset = { ...offset };
    const previousSize = { ...size };
    let _boundary: Boundary;
    let originMouseX: number;
    let originMouseY: number;

    function onDragging(e: MouseEvent | DragEvent) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      const x = pageX - originMouseX + previousOffset.x;
      const y = pageY - originMouseY + previousOffset.y;
      setOffset({ x, y });
    }
    function onDragEnd(e: MouseEvent | DragEvent) {
      cover.remove();
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      previousOffset.x += pageX - originMouseX;
      previousOffset.y += pageY - originMouseY;
      window.removeEventListener('mousemove', onDragging);
      window.removeEventListener('mouseup', onDragEnd);
    }
    function onDragStart() {
      window.addEventListener('mousemove', onDragging);
      window.addEventListener('mouseup', onDragEnd);
    }
    function onDraggingTop(e: MouseEvent | DragEvent) {
      const { pageY } = getComputedPagePosition(e, _boundary);
      const { x } = previousOffset;
      const y = pageY - originMouseY + previousOffset.y;
      setOffset({ x, y });
    }
    function onDragEndTop(e: MouseEvent | DragEvent) {
      const { pageY } = getComputedPagePosition(e, _boundary);
      previousOffset.y += pageY - originMouseY;
      window.removeEventListener('mousemove', onDraggingTop);
      window.removeEventListener('mouseup', onDragEndTop);
    }
    function onDragStartTop() {
      window.addEventListener('mousemove', onDraggingTop);
      window.addEventListener('mouseup', onDragEndTop);
    }
    function onDraggingLeft(e: MouseEvent | DragEvent) {
      const { pageX } = getComputedPagePosition(e, _boundary);
      const x = pageX - originMouseX + previousOffset.x;
      const { y } = previousOffset;
      setOffset({ x, y });
    }
    function onDragEndLeft(e: MouseEvent | DragEvent) {
      const { pageX } = getComputedPagePosition(e, _boundary);
      previousOffset.x += pageX - originMouseX;
      window.removeEventListener('mousemove', onDraggingLeft);
      window.removeEventListener('mouseup', onDragEndLeft);
    }
    function onDragStartLeft() {
      window.addEventListener('mousemove', onDraggingLeft);
      window.addEventListener('mouseup', onDragEndLeft);
    }
    function onResizingRight(e: MouseEvent | DragEvent) {
      const { pageX } = getComputedPagePosition(e, _boundary);
      const width = pageX - originMouseX + previousSize.width;
      const { height } = previousSize;
      setSize({ width, height });
    }
    function onResizeEndRight(e: MouseEvent | DragEvent) {
      const { pageX } = getComputedPagePosition(e, _boundary);
      previousSize.width += pageX - originMouseX;
      window.removeEventListener('mousemove', onResizingRight);
      window.removeEventListener('mouseup', onResizeEndRight);
    }
    function onResizeStartRight() {
      window.addEventListener('mousemove', onResizingRight);
      window.addEventListener('mouseup', onResizeEndRight);
    }
    function onResizingBottom(e: MouseEvent | DragEvent) {
      const { pageY } = getComputedPagePosition(e, _boundary);
      const { width } = previousSize;
      const height = pageY - originMouseY + previousSize.height;
      setSize({ width, height });
    }
    function onResizeEndBottom(e: MouseEvent | DragEvent) {
      const { pageY } = getComputedPagePosition(e, _boundary);
      previousSize.height += pageY - originMouseY;
      window.removeEventListener('mousemove', onResizingBottom);
      window.removeEventListener('mouseup', onResizeEndBottom);
    }
    function onResizeStartBottom() {
      window.addEventListener('mousemove', onResizingBottom);
      window.addEventListener('mouseup', onResizeEndBottom);
    }
    function onResizingLeft(e: MouseEvent | DragEvent) {
      const { pageX } = getComputedPagePosition(e, _boundary);
      const width = -pageX + originMouseX + previousSize.width;
      const { height } = previousSize;
      setSize({ width, height });
    }
    function onResizeEndLeft(e: MouseEvent | DragEvent) {
      const { pageX } = getComputedPagePosition(e, _boundary);
      previousSize.width += -pageX + originMouseX;
      window.removeEventListener('mousemove', onResizingLeft);
      window.removeEventListener('mouseup', onResizeEndLeft);
    }
    function onResizeStartLeft() {
      window.addEventListener('mousemove', onResizingLeft);
      window.addEventListener('mouseup', onResizeEndLeft);
    }
    function onResizingTop(e: MouseEvent | DragEvent) {
      const { pageY } = getComputedPagePosition(e, _boundary);
      const height = -pageY + originMouseY + previousSize.height;
      const { width } = previousSize;
      setSize({ width, height });
    }
    function onResizeEndTop(e: MouseEvent | DragEvent) {
      const { pageY } = getComputedPagePosition(e, _boundary);
      previousSize.height += -pageY + originMouseY;
      window.removeEventListener('mousemove', onResizingTop);
      window.removeEventListener('mouseup', onResizeEndTop);
    }
    function onResizeStartTop() {
      window.addEventListener('mousemove', onResizingTop);
      window.addEventListener('mouseup', onResizeEndTop);
    }
    function onResizingTopLeft(e: MouseEvent | DragEvent) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      const width = -pageX + originMouseX + previousSize.width;
      const height = -pageY + originMouseY + previousSize.height;
      setSize({ width, height });
    }
    function onResizeEndTopLeft(e: MouseEvent | DragEvent) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      previousSize.width += -pageX + originMouseX;
      previousSize.height += -pageY + originMouseY;
      window.removeEventListener('mousemove', onResizingTopLeft);
      window.removeEventListener('mouseup', onResizeEndTopLeft);
    }
    function onResizeStartTopLeft() {
      window.addEventListener('mousemove', onResizingTopLeft);
      window.addEventListener('mouseup', onResizeEndTopLeft);
    }
    function onResizingTopRight(e: MouseEvent | DragEvent) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      const width = pageX - originMouseX + previousSize.width;
      const height = -pageY + originMouseY + previousSize.height;
      setSize({ width, height });
    }
    function onResizeEndTopRight(e: MouseEvent | DragEvent) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      previousSize.width += pageX - originMouseX;
      previousSize.height += -pageY + originMouseY;
      window.removeEventListener('mousemove', onResizingTopRight);
      window.removeEventListener('mouseup', onResizeEndTopRight);
    }
    function onResizeStartTopRight(e: MouseEvent | DragEvent) {
      window.addEventListener('mousemove', onResizingTopRight);
      window.addEventListener('mouseup', onResizeEndTopRight);
    }
    function onResizingBottomLeft(e: MouseEvent | DragEvent) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      const width = -pageX + originMouseX + previousSize.width;
      const height = pageY - originMouseY + previousSize.height;
      setSize({ width, height });
    }
    function onResizeEndBottomLeft(e: MouseEvent | DragEvent) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      previousSize.width += -pageX + originMouseX;
      previousSize.height += pageY - originMouseY;
      window.removeEventListener('mousemove', onResizingBottomLeft);
      window.removeEventListener('mouseup', onResizeEndBottomLeft);
    }
    function onResizeStartBottomLeft() {
      window.addEventListener('mousemove', onResizingBottomLeft);
      window.addEventListener('mouseup', onResizeEndBottomLeft);
    }
    function onResizingBottomRight(e: MouseEvent | DragEvent) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      const width = pageX - originMouseX + previousSize.width;
      const height = pageY - originMouseY + previousSize.height;
      setSize({ width, height });
    }
    function onResizeEndBottomRight(e: MouseEvent | DragEvent) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      previousSize.width += pageX - originMouseX;
      previousSize.height += pageY - originMouseY;
      window.removeEventListener('mousemove', onResizingBottomRight);
      window.removeEventListener('mouseup', onResizeEndBottomRight);
    }
    function onResizeStartBottomRight() {
      window.addEventListener('mousemove', onResizingBottomRight);
      window.addEventListener('mouseup', onResizeEndBottomRight);
    }
    function onMouseDown(e: MouseEvent | DragEvent) {
      originMouseX = e.pageX;
      originMouseY = e.pageY;
      _boundary = { ...boundary };
      if (dragTarget && e.target === dragTarget) {
        document.body.appendChild(cover);
        return onDragStart();
      }
      if (e.target !== target || !resizable) return;
      switch (cursorPos) {
        case 'topLeft':
          _boundary.right = originMouseX + previousSize.width - constraintSize;
          _boundary.bottom = originMouseY + previousSize.height - constraintSize;
          onResizeStartTopLeft();
          onDragStart();
          break;
        case 'left':
          _boundary.right = originMouseX + previousSize.width - constraintSize;
          onResizeStartLeft();
          onDragStartLeft();
          break;
        case 'bottomLeft':
          _boundary.right = originMouseX + previousSize.width - constraintSize;
          _boundary.top = originMouseY - previousSize.height + constraintSize;
          onResizeStartBottomLeft();
          onDragStartLeft();
          break;
        case 'top':
          _boundary.bottom = originMouseY + previousSize.height - constraintSize;
          onResizeStartTop();
          onDragStartTop();
          break;
        case 'topRight':
          _boundary.bottom = originMouseY + previousSize.height - constraintSize;
          _boundary.left = originMouseX - previousSize.width + constraintSize;
          onDragStartTop();
          onResizeStartTopRight(e);
          break;
        case 'right':
          _boundary.left = originMouseX - previousSize.width + constraintSize;
          onResizeStartRight();
          break;
        case 'bottomRight':
          _boundary.top = originMouseY - previousSize.height + constraintSize;
          _boundary.left = originMouseX - previousSize.width + constraintSize;
          onResizeStartBottomRight();
          break;
        case 'bottom':
          _boundary.top = originMouseY - previousSize.height + constraintSize;
          onResizeStartBottom();
          break;
        default:
      }
    }
    target.addEventListener('mousedown', onMouseDown);
    return () => {
      target.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onDraggingLeft);
      window.removeEventListener('mousemove', onDraggingTop);
      window.removeEventListener('mousemove', onDragging);
      window.removeEventListener('mouseup', onDragEndTop);
      window.removeEventListener('mouseup', onDragEndLeft);
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('mousemove', onResizingTop);
      window.removeEventListener('mousemove', onResizingRight);
      window.removeEventListener('mousemove', onResizingBottom);
      window.removeEventListener('mousemove', onResizingLeft);
      window.removeEventListener('mousemove', onResizingBottomLeft);
      window.removeEventListener('mousemove', onResizingTopLeft);
      window.removeEventListener('mousemove', onResizingTopRight);
      window.removeEventListener('mousemove', onResizingBottomRight);
      window.removeEventListener('mouseup', onResizeEndTop);
      window.removeEventListener('mouseup', onResizeEndRight);
      window.removeEventListener('mouseup', onResizeEndBottom);
      window.removeEventListener('mouseup', onResizeEndLeft);
      window.removeEventListener('mouseup', onResizeEndBottomLeft);
      window.removeEventListener('mouseup', onResizeEndTopLeft);
      window.removeEventListener('mouseup', onResizeEndTopRight);
      window.removeEventListener('mouseup', onResizeEndBottomRight);
      cover.remove();
    };
    // eslint-disable-next-line
  }, [boundary.top, boundary.right, boundary.bottom, boundary.left, cursorPos]);
  return { offset, size };
}
function useCursor<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  threshold: number,
  resizable: boolean,
) {
  const [position, setPosition] = useState('');
  useEffect(() => {
    const target = ref.current;
    if (!target || !resizable) return;
    const cover = document.createElement('div');
    cover.style.position = 'fixed';
    cover.style.top = '0';
    cover.style.left = '0';
    cover.style.right = '0';
    cover.style.bottom = '0';
    let lock = false;
    function _setPosition(p: string) {
      setPosition(p);
      target && (target.style.cursor = getCursorStyle(p));
      cover.style.cursor = getCursorStyle(p);
    }
    function onMouseDown(e: MouseEvent) {
      if (e.target !== target) return;
      onHover(e);
      lock = true;
      document.body.appendChild(cover);
      window.addEventListener('mouseup', onMouseUp);
    }
    function onMouseUp() {
      lock = false;
      cover.remove();
      window.removeEventListener('mouseup', onMouseUp);
    }
    function onHoverEnd() {
      if (lock) return;
      _setPosition('');
    }
    function onHover(e: MouseEvent | DragEvent) {
      if (lock) return;
      if (e.target !== target) return _setPosition('');
      const { offsetX, offsetY } = e;
      const { width, height } = target?.getBoundingClientRect() as DOMRect;
      if (offsetX < threshold) {
        if (offsetY < threshold) {
          _setPosition('topLeft');
        } else if (height - offsetY < threshold) {
          _setPosition('bottomLeft');
        } else {
          _setPosition('left');
        }
      } else if (offsetY < threshold) {
        if (width - offsetX < threshold) {
          _setPosition('topRight');
        } else {
          _setPosition('top');
        }
      } else if (width - offsetX < threshold) {
        if (height - offsetY < threshold) _setPosition('bottomRight');
        else _setPosition('right');
      } else if (height - offsetY < threshold) {
        _setPosition('bottom');
      } else {
        _setPosition('');
      }
    }
    target.addEventListener('mouseleave', onHoverEnd);
    target.addEventListener('mousemove', onHover);
    target.addEventListener('mousedown', onMouseDown);
    return () => {
      cover.remove();
      target.removeEventListener('mouseleave', onHoverEnd);
      target.removeEventListener('mousemove', onHover);
      target.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
    // eslint-disable-next-line
  }, []);
  return position;
}

function getComputedPagePosition(e: MouseEvent, boundary: Boundary) {
  let { pageX, pageY } = e;
  if (!boundary) return { pageX, pageY };
  const { top, right, bottom, left } = boundary;
  if (pageX <= left) pageX = left;
  else if (pageX >= right) pageX = right;
  if (pageY <= top) pageY = top;
  else if (pageY >= bottom) pageY = bottom;
  return { pageX, pageY };
}
function getCursorStyle(pos: string) {
  switch (pos) {
    case 'top':
      return 'n-resize';
    case 'topRight':
      return 'ne-resize';
    case 'right':
      return 'e-resize';
    case 'bottomRight':
      return 'se-resize';
    case 'bottom':
      return 's-resize';
    case 'bottomLeft':
      return 'sw-resize';
    case 'left':
      return 'w-resize';
    case 'topLeft':
      return 'nw-resize';
    default:
      return 'auto';
  }
}
export { useElementResize };
