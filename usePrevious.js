
export function usePrevious(currentValue) {
    const i = currentIndex;
    const element = hook[i];
    hook[i] = currentValue;
    currentIndex++;
    return element;
  }
  