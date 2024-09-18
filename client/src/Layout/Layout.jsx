import React from 'react'
import ToggleMenu from '../Components/ToggleMenu'
import Footer from '../Components/Footer'
import AdminPage from '../Pages/Admin/AdminPage'
import CreatePost from '../Pages/Admin/CreatePost'
import UpdatePost from '../Pages/Admin/UpdatePost'
import UpdateText from '../Pages/Admin/UpdateText'
import CreateText from '../Pages/Admin/CreateText'
import PrivateRoute from '../Components/PrivateRoute'
import SignIn from '../Pages/SignIn/SignIn'
import SignUp from '../Pages/SignUp/SignUp'
import Hakkinda from '../Pages/Hakkinda/Hakkinda'
import CalismaAlanlari from '../Pages/CalismaAlanlari/CalismaAlanlari'
import Blog from '../Pages/Blog/Blog'
import Iletisim from '../Pages/Iletisim/Iletisim'
import Anasayfa from '../Pages/Anasayfa/Anasayfa'
import Galeri from '../Pages/Galeri/Galeri'
import Akademik from '../Pages/Akademik/Akademik'
import Header from '../Components/Header'
import { Navbar } from 'flowbite-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {Route,Routes} from 'react-router-dom'
import CreatePublication from '../Pages/Admin/CreatePublication'
import UpdatePublication from '../Pages/Admin/UpdatePublication'
import PostPage from '../Pages/PostPage/PostPage'
function Layout() {

    const { menu } = useSelector(state => state.header)
    const location = useLocation()

  return (
    <div>
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

          <Route path='/post/:postSlug' element={<PostPage />} />

          <Route element={<PrivateRoute />}>
            <Route path='/admin' element={<AdminPage />} />

            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/update-post/:postId' element={<UpdatePost />} />

            <Route path='/create-text' element={<CreateText />} />
            <Route path='/update-text/:textId' element={<UpdateText />} />

            <Route path='/create-publication' element={<CreatePublication />}/>
            <Route path='/update-publication/:publicationId' element={<UpdatePublication />}/>
            
          </Route>

          <Route path='/' element={<Anasayfa />} />

        </Routes>}
    {
      location.pathname !== '/admin' && location.pathname !== '/giris-yap' && location.pathname !== '/kayit-ol' && <Footer />
    }
    </div>
  )
}

export default Layout