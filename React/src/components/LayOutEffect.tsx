import { useLayoutEffect, useRef, useState } from "react";

export default function Layout() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (boxRef.current) {
      setWidth(boxRef.current.getBoundingClientRect().width); // this blocks the render
    }
    requestAnimationFrame(()=>{
        boxRef.current.style.border= '2px solid black'
    })
  }, []);

  return (
    <div>
      <div ref={boxRef} style={{ width: "200px", border: "1px solid black" }}>
        Hello
      </div>
      <p>Width: {width}</p>
    </div>
  );
}