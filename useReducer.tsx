<import {useReducer} from 'react'


function reducer(action,state){
    switch(action.type){
        case 'increment':{
            return {
                count:state.count+1
            }
        }
        case 'decreament':{
            return {
                count:state.count-1
            }
        }
        case 'reset':{
            return {
                count:0
            }
        }
        default:{
            return state
        }
    }
}

export default function App(){

    const [state,dispatch]= useReducer(reducer,{count:0})


    return (
        <>
        <button onClick={()=>dispatch('increamt')}>
            A
        </button>
         <button onClick={()=>dispatch('decermet')}>
         A
     </button>
      <button onClick={()=>dispatch('reset')}>
      A
  </button>
        </>
    )

}>