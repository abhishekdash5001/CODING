import { memo, useMemo, useState } from 'react';

const list = Array.from({ length: 1000000 }, (_, i) => i);

export const MEMO = () => {
  console.log('parent render');

  const [value, setValue] = useState<number>(0);
  const [change, setChange] = useState('');

  const obj = useMemo(() => {
    
   const a =   list.find((l) => l === value);
   return {
    id:a,
    value:a*2
   }
  }, [value]);
  console.log(obj)

  return (
    <div className="wrapper">
      <span>Memo</span>
      <div>
        <input
          value={change}
          onChange={(e) => setChange(e.currentTarget.value)}
        />
        <CHILD index={obj} />
      </div>
    </div>
  );
};

export const CHILD = memo((props:any) => {
 
  return <>{props.id}</>;
}, comparator);

function comparator(
  prevProps,
  nextProps
) {
  console.log('comparator called');
  return prevProps.id === nextProps.id;
}