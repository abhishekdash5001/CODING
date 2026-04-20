import { useReducer, type  FC } from "react";

interface IReducerProps {};

const TYPES={
    INCREASE:'INCREASE',
    DECREASE:'DECREASE',
    RESET:'RESET'
} as const

type MyType = (typeof TYPES)[keyof typeof TYPES]

interface State{
    counter:number
}

interface Action {
    type:MyType
}
function reducerFn(state:State,action:Action){

    switch(action.type){
        case TYPES.INCREASE :{
            return {
                ...state,
                counter:state.counter+1
            }
        }

        case TYPES.DECREASE :{
            return {
                ...state,
                counter:state.counter-1
            }
        }

        case TYPES.RESET :{
            return  defaultState
            
        }

        default : {
            return defaultState
        }
    }

}

const defaultState:State={
    counter:0
}

export const Reducer: FC<IReducerProps> = () => {

    const [state,disaptch]= useReducer(reducerFn,{counter:0})

    console.log(state)
    return (
        <div className="wrapper">
            <span>
                Reducer
            </span>
            <div>
                
{state.counter}
                <button onClick={()=>disaptch({type:TYPES.INCREASE})}>
                    Increase
                </button>
                <button onClick={()=>disaptch({type:TYPES.RESET})}>
                    Reset
                </button>
                <button onClick={()=>disaptch({type:TYPES.DECREASE})}>
                    decrease
                </button>
            </div>


            
        </div>
    );
}
