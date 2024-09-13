import { Navbar } from 'flowbite-react'
import { useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import SignIn from '../src/Pages/SignIn/SignIn'
import SignUp from '../src/Pages/SignUp/SignUp'
import Hakkinda from '../src/Pages/Hakkinda/Hakkinda'
import CalismaAlanlari from '../src/Pages/CalismaAlanlari/CalismaAlanlari'
import Blog from '../src/Pages/Blog/Blog'
import Iletisim from '../src/Pages/Iletisim/Iletisim'
import Anasayfa from '../src/Pages/Anasayfa/Anasayfa'
import Galeri from '../src/Pages/Galeri/Galeri'
import Akademik from '../src/Pages/Akademik/Akademik'
import Header from './Components/Header'
import { useSelector } from 'react-redux'
import ToggleMenu from './Components/ToggleMenu'

function App() {
 const {menu}=useSelector(state=>state.header)

  return (
    <BrowserRouter>
    <Header/>
    {
      menu ? 
      <ToggleMenu /> 
      :
 <Routes>
 <Route path='/giris-yap' element={<SignIn/>}/>
 <Route path='/kayit-ol' element={<SignUp/>}/>
 <Route path='/hakkinda' element={<Hakkinda/>}/>
 <Route path='/calisma-alanlari' element={<CalismaAlanlari/>}/>
 <Route path='/blog' element={<Blog/>}/>
 <Route path='/Akademik' element={<Akademik/>}/>
 <Route path='/iletisim' element={<Iletisim/>}/>
 <Route path='/galeri' element={<Galeri/>}/>
 
 <Route path='/' element={<Anasayfa/>}/>
 
 </Routes>}
   
    </BrowserRouter>
  )
}

export default App
