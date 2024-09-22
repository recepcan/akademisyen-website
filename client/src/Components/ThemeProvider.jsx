import React from 'react'
import { useSelector } from 'react-redux'

function ThemeProvider({children}) {
    const {theme} =useSelector(state=>state.header)
  return (
    <div className={theme}>
    <div className='bg-gradient-to-t from-white via-sky-100 to-white
     text-black dark:from-black dark:via-[#030620] dark:to-black
    dark:text-white dark:shadow-none font-titillium
       transition-all duration-300'>
    {children}
    </div>
    </div>
  )
}

export default ThemeProvider