import { Navbar } from 'flowbite-react'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
import { PersistGate } from 'redux-persist/integration/react'
import Footer from './Components/Footer'
import AdminPage from './Pages/Admin/AdminPage'
import CreatePost from './Pages/Admin/CreatePost'
import UpdatePost from './Pages/Admin/UpdatePost'
import UpdateText from './Pages/Admin/UpdateText'
import CreateText from './Pages/Admin/CreateText'
import PrivateRoute from './Components/PrivateRoute'

function App() {
  const { menu } = useSelector(state => state.header)

  return (

    <div className='min-h-screen'>
      <BrowserRouter >
        <Header />
        {
          menu ?
            <ToggleMenu />
            :
            <Routes>
              <Route path='/giris-yap' element={<SignIn />} />
              <Route path='/kayit-ol' element={<SignUp />} />
              <Route path='/hakkinda' element={<Hakkinda />} />
              <Route path='/calisma-alanlari' element={<CalismaAlanlari />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/Akademik' element={<Akademik />} />
              <Route path='/iletisim' element={<Iletisim />} />
              <Route path='/galeri' element={<Galeri />} />

              <Route element={<PrivateRoute />}>
                <Route path='/admin' element={<AdminPage />} />
                <Route path='/create-post' element={<CreatePost />} />
                <Route path='/update-post/:postId' element={<UpdatePost />} />
                <Route path='/update-text/:textId' element={<UpdateText />} />
                <Route path='/create-text' element={<CreateText />} />
              </Route>

              <Route path='/' element={<Anasayfa />} />

            </Routes>}
        {
          location.pathname !== '/admin' && location.pathname !== '/giris-yap' && location.pathname !== '/kayit-ol' && <Footer />
        }
      </BrowserRouter>
    </div>
  )
}

export default App
