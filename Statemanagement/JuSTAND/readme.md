## Zustand = simpler, less boilerplate, direct

# create 1 store
# this has states
# has function s and actions
# component listent to what it need only by using hooks



```js

// store/useCounterStore.ts
import { create } from 'zustand';

type CounterStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,

  increment: () =>
    set((state) => ({
      count: state.count + 1,
    })),

  decrement: () =>
    set((state) => ({
      count: state.count - 1,
    })),

  reset: () => set({ count: 0 }),
}));


import { useCounterStore } from './store/useCounterStore';

export default function Counter() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

```


# Very little boilerplate
# No provider needed in most simple cases
# it can have mutple stores
# Easy to learn
# const count = useCounterStore((s) => s.count); to select what will render the compoennt


## limitation
1 Pesistence thrugh middle like on refersh we leepthe theme
/Reduc devtoll connect will be done by midelware 
wfeature aret heyer but e ae to opt in