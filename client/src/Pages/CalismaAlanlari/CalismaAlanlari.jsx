import React, { useEffect, useState } from 'react'
import ServicesCard from './ServicesCard'
import uzay from '../../../public/uzay.png'
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../redux/servicesSlice';
import Loading from '../../Components/Loading';

function CalismaAlanlari() {

    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.services);
  
    const [activeTab, setActiveTab] = useState(null);  // İlk başta null
  
    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);
  
    useEffect(() => {
        // Eğer data varsa, ilk tab'i aktif olarak ayarla
        if (data?.services?.length) {
            setActiveTab(data.services[0].title);
        }
    }, [data]); // Data değişince tetiklenir
  
    if (loading) {
      return <Loading/>
    }
  
    if (error) {
      toast.error(error);
      return <div>Error: {error}</div>;
    }
  
    if (data.length === 0) {
      return <div>No service available</div>;
    }

    const handleTabClick = (tabTitle) => {
        setActiveTab(tabTitle);
    };

    return (
        <div className='min-h-screen p-5'>
            <div className="min-w-full dark:shadow-none py-3 box-border relative flex">
                <div className="w-1/4 h-full sticky top-0 border-r dark:border-white border-black py-32 flex flex-col justify-start items-center">
                    {data?.services.map((tab, index) => (
                        <button
                            key={index}
                            className={` ${activeTab === tab.title ? 
                                ' h-[70px] w-full p-2 max-sm:text-sm font-bold bg-sky-600 text-white box-border cursor-pointer border-b border-gray-600 transition-all flex justify-items-center' 
                                : ' h-[70px] p-2 w-full hover:border-y-2 cursor-pointer transition-all border-b border-gray-600 box-border flex justify-center items-center'}`}
                            onClick={() => handleTabClick(tab.title)}
                        >
                            <div className={`${activeTab === tab.title ? 'text-white text-2xl max-md:text-4xl' : ' text-2xl max-md:text-4xl text-black'}`}></div>
                            <h1 className='text-lg max-md:hidden '>{tab.title}</h1>
                        </button>
                    ))}
                </div>

                <div className="w-3/4 h-full dark:text-white items-center justify-center flex-1 text-sm md:text-lg font-sans tracking-wider leading-6">
                    {data?.services.map((tab, index) => (
                        activeTab === tab.title && (
                            <div key={index} className='flex space-y-8 justify-center items-center relative flex-col w-full'>
                                <div className='lg:w-[500px] w-full h-[300px] p-5 text-5xl text-white rounded-xl'>
                                    <img src={tab.image} alt="" className='w-full h-full rounded-xl object-cover'/>
                                </div>
                                <div className='flex-1 flex-wrap p-5'>
                                    <div className="p-3 max-w-2xl mx-auto w-full post-content" dangerouslySetInnerHTML={{ __html: tab.content }} />
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CalismaAlanlari;
