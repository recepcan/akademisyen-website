import { Avatar, Button, Dropdown,  TextInput } from "flowbite-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaFlagCheckered,
  FaInfoCircle,
  FaMoon,
  FaSun,
  FaReact,
} from "react-icons/fa";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { GiMoon } from "react-icons/gi";
import { BiSolidSun } from "react-icons/bi";
import { IoMoonSharp } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu, toggleTheme } from "../redux/headerEventsSlice";
function Header() {
    
  const { menu, theme } = useSelector((state) => state.header);
  
  const dispatch = useDispatch();

 

   {/* nav menu items array */}  
  const Links = [
    {
      id: "Anasayfa",
      name: "Anasayfa",
      to: "/",
      icon: null,
    },
    {
      id: "hakkinda",
      name: "Hakkında",
      to: "/hakkinda",
      index: true,
      icon: null,
    },
    {
      id: "akademik",
      name: "Akademik",
      to: "/akademik",
      index: true,
      icon: null,
    },
    {
      id: "calismaAlanlari",
      name: "Çalışma-Alanları",
      to: "/calisma-alanlari",
      index: true,
      icon: null,
    },
    {
      id: "blog",
      name: "Blog",
      to: "/blog",
      index: true,
      icon: null,
    },
    {
      id: "galeri",
      name: "Galeri",
      to: "/galeri",
      index: true,
      icon: null,
    },

    {
      id: "iletisim",
      name: "İletişim",
      to: "/iletisim",
      icon: null,
    },
    {
      id:"admin",
      name:"admin",
      to:"/admin",
    }
  ];

  return (
    <header className=" p-5 transition-all duration-300 flex justify-around   ">
      {/* logo */}
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold "
      >
        <span className="px-2 py-1 border border-black  rounded-lg dark:border-white">
          Recep
        </span>
        Can
      </Link>

      {/* Navigation menu */}
      <div className="flex items-center justify-around text-center space-x-1 text-sm max-lg:hidden transition-all  duration-300">
        {Links?.map((item, index) => {
          return (
            <div key={index}>
              <NavLink
                id={item.id}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "dark:text-sky-500  text-black font-extrabold"
                    : "hover:text-black dark:text-white text-[#acacac] dark:hover:text-sky-300 shadow-md shadow-gray-400 rounded-lg"
                }
              >
                <div
                  className="p-2 items-center  justify-between space-x-1 flex box-border 
                        h-full transition-colors duration-300  text-sm font-mono"
                >
                  <h2>{item.name}</h2>
                </div>
              </NavLink>
            </div>
          );
        })}

        <Button gradientDuoTone="purpleToBlue" outline>
          Online Görüşme
        </Button>

        {/* dark mode toggle */}
        <div
          className="cursor-pointer  p-2 "
          onClick={() => dispatch(toggleTheme())}
        >
          {theme == "light" ? (
            <FaMoon className="text-purple-600 text-xl" />
          ) : (
            <FaSun className="text-orange-400 text-xl" />
          )}
        </div>
      </div>

      {/* mobil menu  toggle menu */}
      <div
        className="lg:hidden text-3xl"
        onClick={() => dispatch(toggleMenu())}
      >
        <AiOutlineMenu />
      </div>
    </header>
  );
}

export default Header;
