import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaFlagCheckered, FaInfoCircle, FaMoon, FaSun, FaReact } from "react-icons/fa";
import { AiOutlineMenu ,AiOutlineSearch} from 'react-icons/ai';
import { GiMoon } from 'react-icons/gi';
import { BiSolidSun } from 'react-icons/bi';
import { IoMoonSharp } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { useEffect, useState } from 'react';
import  {useSelector, useDispatch } from 'react-redux'
import { toggleMenu } from '../redux/headerEventsSlice';
function Header() {
const {menu} =useSelector(state=>state.header)
console.log(menu)
const dispatch =useDispatch()
    const path = useLocation().pathname;
    const location = useLocation().pathname;
    const pathAfterSlash = location.split('/')[1].toLowerCase();

    const [rotation, setRotation] = useState(0);
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        setRotation(scrollTop % 120);
    };


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


  


    const Links = [
        {
            id: 'Anasayfa',
            name: 'Anasayfa',
            to: '/',
            icon: null
        },
        {
            id: 'hakkinda',
            name: 'Hakkında',
            to: '/hakkinda',
            index: true,
            icon: null
        },
        {
            id: 'akademik',
            name: 'Akademik',
            to: '/akademik',
            index: true,
            icon:null
        },
        {
            id: 'calismaAlanlari',
            name: 'Çalışma Alanları',
            to: '/calisma-alanlari',
            index: true,
            icon: null
        },
        {
            id: 'blog',
            name: 'Blog',
            to: '/blog',
            index: true,
            icon: null
        },
        {
            id: 'galeri',
            name: 'Galeri',
            to: '/galeri',
            index: true,
            icon: null
        },
        
        {
            id: 'iletisim',
            name: 'İletişim',
            to: '/iletisim',
            icon: null


        }

    ]


    return (
    <Navbar className='border-b-2 p-5'>
    <Link
    to='/'
    className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
  >
    <span className='px-2 py-1 bg-gradient-to-bl bg-transparent from-blue-500 via-teal-500 to-teal-100 rounded-lg text-white'>
     Yunus
    </span>
    Altundag
  </Link>

     
     
      <div className='flex items-center justify-around text-center space-x-1 text-sm max-lg:hidden transition-all  duration-300'>
      {
        Links?.map((item, index) => {
            return (
                <div
                key={index}
            
                >
                <NavLink
                id={item.id}
                to={item.to}
                className={({ isActive }) => 
                    isActive 
                ?'dark:text-sky-300  text-black font-extrabold'
                  : 'hover:text-black text-[#acacac] dark:hover:text-sky-300 shadow-md shadow-gray-400 rounded-lg'}
            >
                        <div 
                        className="p-2 items-center  justify-between space-x-1 flex box-border 
                        h-full transition-colors duration-300  text-sm font-mono">
                            <h2>{item.name}</h2>
                        
                        </div>
                    </NavLink>
                </div>
            )
        }
        )
    }
    <Button  gradientDuoTone="purpleToBlue" outline >Online Görüşme</Button>
      </div>
<div
                        className=' lg:hidden text-black dark:text-white text-3xl' onClick={()=>dispatch(toggleMenu())}>
                        <AiOutlineMenu />
                    </div>

     
    
    </Navbar>
  )
}

export default Header