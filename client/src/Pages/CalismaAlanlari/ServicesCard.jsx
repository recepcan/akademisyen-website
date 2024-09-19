import React, { useState } from 'react';
import { BiLogoFirebase, BiLogoMongodb } from 'react-icons/bi';
import { DiNodejs } from 'react-icons/di';
import { FaReact } from 'react-icons/fa';
import { SiExpress } from 'react-icons/si';

function ServicesCard() {
    const tabs = [
        {
            title: "Calisma Alani 1",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat provident facere aut nostrum ipsum ab, odit, quas, aliquid autem ut vel quisquam error nobis ipsam impedit distinctio quo cumque. Harum ad velit quasi, sed nostrum voluptas cumque ut deserunt et porro neque sequi quia quaerat, vitae soluta architecto iste saepe error veritatis odit fugiat voluptatum itaque distinctio dignissimos. Voluptate minus unde quo non aliquid quia voluptatem beatae delectus enim. Voluptates dicta quia numquam aliquid sit mollitia quaerat natus praesentium maiores delectus ipsa nesciunt libero, expedita recusandae facilis rem qui explicabo, quis unde similique quidem minima adipisci sapiente. Nulla, repudiandae atque."
            , icon: null
        },
        {
            title: "Calisma Alani 2",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat provident facere aut nostrum ipsum ab, odit, quas, aliquid autem ut vel quisquam error nobis ipsam impedit distinctio quo cumque. Harum ad velit quasi, sed nostrum voluptas cumque ut deserunt et porro neque sequi quia quaerat, vitae soluta architecto iste saepe error veritatis odit fugiat voluptatum itaque distinctio dignissimos. Voluptate minus unde quo non aliquid quia voluptatem beatae delectus enim. Voluptates dicta quia numquam aliquid sit mollitia quaerat natus praesentium maiores delectus ipsa nesciunt libero, expedita recusandae facilis rem qui explicabo, quis unde similique quidem minima adipisci sapiente. Nulla, repudiandae atque."
            , icon:null

        },

        {
            title: "Calisma Alani 3",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat provident facere aut nostrum ipsum ab, odit, quas, aliquid autem ut vel quisquam error nobis ipsam impedit distinctio quo cumque. Harum ad velit quasi, sed nostrum voluptas cumque ut deserunt et porro neque sequi quia quaerat, vitae soluta architecto iste saepe error veritatis odit fugiat voluptatum itaque distinctio dignissimos. Voluptate minus unde quo non aliquid quia voluptatem beatae delectus enim. Voluptates dicta quia numquam aliquid sit mollitia quaerat natus praesentium maiores delectus ipsa nesciunt libero, expedita recusandae facilis rem qui explicabo, quis unde similique quidem minima adipisci sapiente. Nulla, repudiandae atque."
            , icon: null
        },
        {
            title: "Calisma Alani 4",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat provident facere aut nostrum ipsum ab, odit, quas, aliquid autem ut vel quisquam error nobis ipsam impedit distinctio quo cumque. Harum ad velit quasi, sed nostrum voluptas cumque ut deserunt et porro neque sequi quia quaerat, vitae soluta architecto iste saepe error veritatis odit fugiat voluptatum itaque distinctio dignissimos. Voluptate minus unde quo non aliquid quia voluptatem beatae delectus enim. Voluptates dicta quia numquam aliquid sit mollitia quaerat natus praesentium maiores delectus ipsa nesciunt libero, expedita recusandae facilis rem qui explicabo, quis unde similique quidem minima adipisci sapiente. Nulla, repudiandae atque."
            ,icon:null
        },

        {
            title: "Calisma Alani 5",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat provident facere aut nostrum ipsum ab, odit, quas, aliquid autem ut vel quisquam error nobis ipsam impedit distinctio quo cumque. Harum ad velit quasi, sed nostrum voluptas cumque ut deserunt et porro neque sequi quia quaerat, vitae soluta architecto iste saepe error veritatis odit fugiat voluptatum itaque distinctio dignissimos. Voluptate minus unde quo non aliquid quia voluptatem beatae delectus enim. Voluptates dicta quia numquam aliquid sit mollitia quaerat natus praesentium maiores delectus ipsa nesciunt libero, expedita recusandae facilis rem qui explicabo, quis unde similique quidem minima adipisci sapiente. Nulla, repudiandae atque."
            , icon:null
        }

    ];

    const [activeTab, setActiveTab] = useState(tabs[0].title); // Başlangıçta ilk başlık aktif

    const handleTabClick = (tabTitle) => {
        setActiveTab(tabTitle);
    };

    return (
        <div className=" lg:h-[600px] h-[330px] min-w-full dark:shadow-none  py-3 lg:pb-10  box-border relative  shadow-xl shadow-gray-400 flex flex-col items-center justify-between space-y-0
         hover:shadow-gray-600 dark:border border-blue-300 transition-all dark:from-blue-900 bg-gradient-to-l from-blue-200 via-blue-300 to-blue-400  rounded-xl dark:text-white ">
            <div className=" w-full h-[70px]    p-2  flex  justify-evenly items-center overflow-hidden overflow-x-auto custom-scrollbar rounded-lg ">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={` ${activeTab === tab.title ? 
                            ' space-x-1  p-2 font-bold bg-gray-100 text-black   border-2 border-gray-100  box-border rounded-xl  cursor-pointer transition-all h-full flex justify-center items-center' 
                            : ' space-x-1 p-2  text-white  rounded-xl hover:border-y-2 cursor-pointer transition-all border-white box-border h-full flex justify-center items-center'}`}
                        onClick={() => handleTabClick(tab.title)}
                    >
                   <div className={`${activeTab === tab.title ? 'text-white text-2xl max-md:text-4xl' : ' text-2xl max-md:text-4xl text-black'}`}> 
                   {tab.icon}
                   </div>
                        <h1 className='text-lg max-md:hidden '>{tab.title}</h1>
                    </button>
                ))}
            </div>
            
           
            <div className="  dark:text-white items-center justify-center flex-1 lg:h-72 w-[90%] p-3 lg:p-8 
            text-sm md:text-lg font-sans
             scrollbar-hide overflow-auto custom-scrollbar tracking-wider leading-6">
                {tabs.map((tab, index) => (
                    activeTab === tab.title &&
                     <div  key={index}
                     className='flex space-x-8 justify-center relative'
                   >
                    <div className='w-[500px] text-5xl text-white sticky top-0 h-[400px] bg-gray-500 rounded-xl'>
                    Foto
                    </div>
                    <div className='flex-1'>
                    {tab.content}
                    </div>
                    
                    
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default ServicesCard;