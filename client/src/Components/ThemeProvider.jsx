import React from 'react'
import { useSelector } from 'react-redux'

function ThemeProvider({children}) {
    const {theme} =useSelector(state=>state.header)
  return (
    <div className={theme}>
    <div className=' 
     text-black  dark:bg-[#030620] 
    dark:text-white dark:shadow-none font-titillium
       transition-all duration-300'>
    {children}
    </div>
    </div>
  )
}

export default ThemeProvider