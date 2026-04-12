import { useState } from 'react';

const hook = [];
let currentIndex = 0;

export function useToggle(flag) {
  const i = currentIndex;
  const element = hook[i];

  if (element) {
    return hook[i];
  } else {
    const [isOpen, setIsOpen] = useState(flag);

    function toggle() {
      setIsOpen((prev) => !prev);
    }
    hook[i] = [isOpen, toggle, setIsOpen];
  }
  currentIndex++;
  console.log(hook[i]);
  return hook[i];
}
