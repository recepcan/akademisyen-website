import React, { useState } from 'react'
import ServicesCard from './ServicesCard'
import uzay from '../../../public/uzay.png'
function CalismaAlanlari() {

  const tabs = [
    {
        title: "Yetişkin Psikoterapisi",
        content: " Calisma Alani 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat provident facere aut nostrum ipsum ab, odit, quas, aliquid autem ut vel quisquam error nobis ipsam impedit distinctio quo cumque. Harum ad velit quasi, sed nostrum voluptas cumque ut deserunt et porro neque sequi quia quaerat, vitae soluta architecto iste saepe error veritatis odit fugiat voluptatum itaque distinctio dignissimos. Voluptate minus unde quo non aliquid quia voluptatem beatae delectus enim. Voluptates dicta quia numquam aliquid sit mollitia quaerat natus praesentium maiores delectus ipsa nesciunt libero, expedita recusandae facilis rem qui explicabo, quis unde similique quidem minima adipisci sapiente. Nulla, repudiandae atque.Calisma Alani 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat provident facere aut nostrum ipsum ab, odit, quas, aliquid autem ut vel quisquam error nobis ipsam impedit distinctio quo cumque. Harum ad velit quasi, sed nostrum voluptas cumque ut deserunt et porro neque sequi quia quaerat, vitae soluta architecto iste saepe error veritatis odit fugiat voluptatum itaque distinctio dignissimos. Voluptate minus unde quo non aliquid quia voluptatem beatae delectus enim. Voluptates dicta quia numquam aliquid sit mollitia quaerat natus praesentium maiores delectus ipsa nesciunt libero, expedita recusandae facilis rem qui explicabo, quis unde similique quidem minima adipisci sapiente. Nulla, repudiandae atque.Calisma Alani 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat provident facere aut nostrum ipsum ab, odit, quas, aliquid autem ut vel quisquam error nobis ipsam impedit distinctio quo cumque. Harum ad velit quasi, sed nostrum voluptas cumque ut deserunt et porro neque sequi quia quaerat, vitae soluta architecto iste saepe error veritatis odit fugiat voluptatum itaque distinctio dignissimos. Voluptate minus unde quo non aliquid quia voluptatem beatae delectus enim. Voluptates dicta quia numquam aliquid sit mollitia quaerat natus praesentium maiores delectus ipsa nesciunt libero, expedita recusandae facilis rem qui explicabo, quis unde similique quidem minima adipisci sapiente. Nulla, repudiandae atque."
        , icon: null
    },
    {
        title: "Ergen Psikoterapisi",
        content: " Calisma Alani 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat provident facere aut nostrum ipsum ab, odit, quas, aliquid autem ut vel quisquam error nobis ipsam impedit distinctio quo cumque. Harum ad velit quasi, sed nostrum voluptas cumque ut deserunt et porro neque sequi quia quaerat, vitae soluta architecto iste saepe error veritatis odit fugiat voluptatum itaque distinctio dignissimos. Voluptate minus unde quo non aliquid quia voluptatem beatae delectus enim. Voluptates dicta quia numquam aliquid sit mollitia quaerat natus praesentium maiores delectus ipsa nesciunt libero, expedita recusandae facilis rem qui explicabo, quis unde similique quidem minima adipisci sapiente. Nulla, repudiandae atque."
        , icon:null

    },

    {
        title: "Kariyer Psikolojik Danışmanlığı",
        content: " Calisma Alani 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat provident facere aut nostrum ipsum ab, odit, quas, aliquid autem ut vel quisquam error nobis ipsam impedit distinctio quo cumque. Harum ad velit quasi, sed nostrum voluptas cumque ut deserunt et porro neque sequi quia quaerat, vitae soluta architecto iste saepe error veritatis odit fugiat voluptatum itaque distinctio dignissimos. Voluptate minus unde quo non aliquid quia voluptatem beatae delectus enim. Voluptates dicta quia numquam aliquid sit mollitia quaerat natus praesentium maiores delectus ipsa nesciunt libero, expedita recusandae facilis rem qui explicabo, quis unde similique quidem minima adipisci sapiente. Nulla, repudiandae atque."
        , icon: null
    },
    {
        title: "Psikolojik Testler",
        content: "  Calisma Alani 4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat provident facere aut nostrum ipsum ab, odit, quas, aliquid autem ut vel quisquam error nobis ipsam impedit distinctio quo cumque. Harum ad velit quasi, sed nostrum voluptas cumque ut deserunt et porro neque sequi quia quaerat, vitae soluta architecto iste saepe error veritatis odit fugiat voluptatum itaque distinctio dignissimos. Voluptate minus unde quo non aliquid quia voluptatem beatae delectus enim. Voluptates dicta quia numquam aliquid sit mollitia quaerat natus praesentium maiores delectus ipsa nesciunt libero, expedita recusandae facilis rem qui explicabo, quis unde similique quidem minima adipisci sapiente. Nulla, repudiandae atque."
        ,icon:null
    },

    {
        title: "Calisma Alani 5",
        content: " Calisma Alani 5 Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat provident facere aut nostrum ipsum ab, odit, quas, aliquid autem ut vel quisquam error nobis ipsam impedit distinctio quo cumque. Harum ad velit quasi, sed nostrum voluptas cumque ut deserunt et porro neque sequi quia quaerat, vitae soluta architecto iste saepe error veritatis odit fugiat voluptatum itaque distinctio dignissimos. Voluptate minus unde quo non aliquid quia voluptatem beatae delectus enim. Voluptates dicta quia numquam aliquid sit mollitia quaerat natus praesentium maiores delectus ipsa nesciunt libero, expedita recusandae facilis rem qui explicabo, quis unde similique quidem minima adipisci sapiente. Nulla, repudiandae atque."
        , icon:null
    }

];

const [activeTab, setActiveTab] = useState(tabs[0].title); // Başlangıçta ilk başlık aktif

const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
};


  return (
    <div className='min-h-screen p-5'>
    
    
   {/* <ServicesCard/>*/}
   <div className="  min-w-full dark:shadow-none  py-3 
     box-border relative   flex  
        ">
            <div className=" w-1/4 h-full sticky top-0  border-r dark:border-white border-black py-32  flex  flex-col  justify-start items-center
               ">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={` ${activeTab === tab.title ? 
                            ' h-[70px] w-full p-2 max-sm:text-sm font-bold bg-sky-600 text-white    box-border   cursor-pointer border-b border-gray-600 transition-all flex justify- items-center' 
                            : ' h-[70px] p-2 w-full    hover:border-y-2 cursor-pointer transition-all border-b border-gray-600 box-border  flex justify-center items-center'}`}
                        onClick={() => handleTabClick(tab.title)}
                    >
                   <div className={`${activeTab === tab.title ? 'text-white text-2xl max-md:text-4xl' : ' text-2xl max-md:text-4xl text-black'}`}> 
                   {tab.icon}
                   </div>
                        <h1 className='text-lg max-md:hidden '>{tab.title}</h1>
                    </button>
                ))}
            </div>
            
           
            <div className="w-3/4   h-full  dark:text-white items-center justify-center flex-1   
            text-sm md:text-lg font-sans
              tracking-wider leading-6">
                {tabs.map((tab, index) => (
                    activeTab === tab.title &&
                     <div  key={index}
                     className='flex space-y-8 justify-center items-center relative flex-col  w-full'
                   >
                   <div className='lg:w-[500px] w-full  h-[300px] p-5   text-5xl text-white   rounded-xl'>
                   <img src={uzay} alt="" className='w-full h-full rounded-xl object-cover'/>
                   </div>
                    <div className='flex-1 flex-wrap p-5 '>
                    {tab.content}
                    </div>
                   
                    
                    </div>
                ))}
            </div>
            
        </div>


    </div>
  )
}

export default CalismaAlanlari