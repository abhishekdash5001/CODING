//What problem did Hooks solve in React

const { useMemo } = require("react");

// 1.For eg we have to write logic of riesize for this we have to create HOC and wrap all compoennt in side it
// but with hooks that not the issue we can crate custom hooks and component and call them if they want to simle

//2 class components has this bind confusion

//What are the Rules of Hooks, and why do they exist??

// 1.Always define hooks at the top level react remeber hooks by position not by name
// 2. Call Hooks only from React function components or custom Hooks

/**
 * How does useState works internally
 * setCount(1) tells React:
   “next time you render this component, use 1 as the state value”
 * react give memory slot to compnent with setters and assig the value we define
 * when change the value react etell when you render next time use this
 * 
 * 
 * 
 * 
 * 
 */

/**
 * WHY UPDATING STATE CAUSE RE RENDER
 *
 * second function in useState tell react the ui is depned on thisand the value has changes i am requestoj render to update the ui
 * and show the new value
 *
 * so when react re -renders it doensot re redner whole dom it actualy creates a new ui  virtualout put
 * reconcile prope;y to update the particulat node
 *
 * State is input
 * re- render is calulaton
 * ui - output
 */

/**
    * Re-render

React recalculates component output again.

Repaint

Browser redraws pixels because visual styles/content changed.

Remount

React throws away old component instance and creates a new one.
    */


/**
 * WHY setState is asyncronous
 * 
 * when ever we chnage the state react doesnot muttate the state directly it keeps the shanpshot of new state value
 * and request a re render in this render the new state is used thats why its asycn
 * there mught be mutiplt state change in 1 click so all set and next render new vals will be used
 */


/**
 * setCount(count + 1); -> take the current snapshot valye and 1 
 * setCount(prev=>prev+1)-> pass a function adn tellreact to update the ccurrent value with 1 in next rernder and then updates the new value in the slot
 * 
 */


function App() {
    const [count, setCount] = React.useState(0);
  
    function handleClick() {
      setCount(prev => prev + 1); // 1
    //   setCount(count + 1); <--- is still the old snapshot value //0
    }
  
    return <button onClick={handleClick}>{count}</button>;
  }


  /***
   * What is batching in React?
   * 
   * it means if in a function we have mmutple set stae react atches those doesn 1 re render
   * 
   */


  /**
   * Can useState updates be skipped by React? When?
   * 
   * Yes when pass same value (premitive) same refernece (object/array)
   *   const [count, setCount] = React.useState(0);
   * setCount(0)
   * 
   * react used object.is to compaore by va;ue prmitive and by reference non premitive
   * 
   * object.is does shallow comparision
   */


  /**
   * Lazy Initializer
   * 
   * const [value, setValue] = useState(expensiveWork()); if we do this when ever compoennt update react call 
   * expensive work but it wiil not be used but it will called
   * 
   * hoever
   * const [value, setValue] = useState(()=>expensiveWork()) react will call it inital render and and subswest render use
   * the store value will not recaculte it
   * 
   */

  /**
   * 
   * useEffect can lets us go it mount unmount update bt it main is keep the cmponet in sych witht the outside world
   * 
   */

  /**
   * bugs of not use reactive state in dependency array
   * 
   *
   * 
   */
  useEffect(()=>{
setInterval(()=>{
    console.log(count)  // this wil 0 0 0 0 0 0 0 0 0 0  even though we have changet he calund
})
  },[])

//   thats why we clean up when deepency array changes and resycn again

useEffect(()=>{
    const a = setInterval(()=>{
        console.log(count)
    },1000)

    return ()=>{
        clearInterval(a)
    }

},[count])

// useEffect(()=>{},[]) as this doesnot have depende prop this will run only once react says andwe read i tas compoent pount only


//When should ewe do data detching in useEffect
/**
 * when data is demanded by the render client on mount 
 * avoid when data is required before rendering the page
 * 
 */

/**
 * useLayoutEffect vs useEffect
 * 
 * useEffect ->  after update after paint
 * useLayoutEffect -> after update before paint -->  bcz we asked for rerender
 * requestAnimationFrame -> get called before the next frame used aniation  -> bcz we asked browser to repaint
 * 
 * useLayoutefect is used to read element positon /size  etx set scrolling etc
 *  
 * useLayoutEffect(() => {
  ref.current.scrollTop = 0;
}, []);
 */

/**
 * as we no useEffect runs after paint so if we do any work ther first we see wrong poistions ad then update will happend we will se right poistion
 * useLayouteffect fixes it before it is shown in the UI
 * tootlip heihgt   
 */


/**
 * useMemo if in the compoennt we have expensive calution that calculation will trigge on every render to st that we use useMemo and use the cached value untill
 * dependency is chaged
 */

const validValues = useMemo(()=>{
 return  Array.from({length:100000}).map((_,i)=>i).filter((_,i)=>{
   return i > id
 })

},[id])

<Child data={validValues}/>

const Child = React.memo(function(props){
  return (
    <>Child</>
  )
})

//const MemoChild = React.memo(Component, arePropsEqual)
/**
 * function arePropsEqual(prevProps, nextProps) {
  // return true  -> skip re-render
  // return false -> re-render
}
 */

//Can useMemo be used for referential stability?  yes  

//What is the tradeoff of overusing useMemo?  code complexity more memory 



//useCallback caches function in subsequest re renders it doensot meean that function is executed and same dpeendcy
// it does but the same refernce function and chil is aware that its same refernce so doenot re redner


let b = useCallBack(()=>{
  myFunc(id)
},[id])



##  useLayouteffect
React renders
DOM is updated
useLayoutEffect runs
browser paints screen
useEffect runs later