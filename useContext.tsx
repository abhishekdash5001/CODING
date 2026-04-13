import {createContext} from 'react'

export const ThemeContext = createContext('light')



export function App(){
    return(
        <ThemeContext.provider value='dark'>
            <Child/>

        </ThemeContext>
    )
}


import {useContext} from 'react'
import  {ThemeContext} from './/path'

function Child(){
    const context = useContext(ThemeContext)

    return(
        <Button>{context}</Button>
    )
}
