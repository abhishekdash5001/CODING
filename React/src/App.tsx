
import './App.css'

import { Throttle } from './components/Throttle'
import { Timer } from './components/Timer'
import { Toggle } from './components/Toggle'
import {Previous} from './components/Previous'
import { Reducer } from './components/Reducer'
import { Debouncer } from './components/Debouncer'
import { StopWatch } from './components/StopWatch'
import { ContextComponent } from './components/Context'
import { createContext, useState, } from 'react'
import { THEMETYPES ,type ThemeTypes} from './types'
import { MEMO } from './components/MEMO'
import { CALLBACK } from './components/CALLBACK'
import { LazyInitializer } from './components/LazyInitializer'
import Layout from './components/LayOutEffect'




type ThemeContextType={
  theme:ThemeTypes
  changeTheme: VoidFunction
}

export const ThemeContext= createContext<ThemeContextType|null>(null)








function App() {

const [theme,setTheme]= useState<ThemeTypes>(THEMETYPES.LIGHT)


const changeTheme=()=>{
  theme === THEMETYPES.DARK ? setTheme(THEMETYPES.LIGHT):setTheme(THEMETYPES.DARK)
}

  return (
    <ThemeContext.Provider value={{theme,changeTheme}} >
   <div className={`parent ${theme}`}>
   <Toggle/>
    <Timer/>
    <Throttle/>
    <Previous/>
    <Reducer/>
    <Debouncer/>
    <StopWatch/>
    <MEMO/>
    <CALLBACK/>
    <ContextComponent/>
    <LazyInitializer/>
    <Layout/>

   </div>
   
    </ThemeContext.Provider>
  )
}

export default App
