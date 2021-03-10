import { RefObject } from 'preact';
import { useEffect } from 'preact/hooks';

export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
): void {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
}
