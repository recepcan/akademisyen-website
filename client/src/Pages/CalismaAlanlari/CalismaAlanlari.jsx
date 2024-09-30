import React, { useEffect, useState, useMemo } from 'react';
import ServicesCard from './ServicesCard';
import uzay from '../../../public/uzay.png';
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

    // Hooks'lar buraya kadar geldiğinde çalışacak

    // Aktif sekmeye ait veriyi ve görseli memoize ediyoruz
    const activeService = useMemo(() => {
        return data?.services.find(service => service.title === activeTab);
    }, [activeTab, data?.services]);

    const serviceImages = useMemo(() => {
        return data?.services.map(service => service.image);
    }, [data?.services]);

    const handleTabClick = (tabTitle) => {
        setActiveTab(tabTitle);
    };

    // Hooks çağrılarından sonra loading, error, veya boş veri kontrolü
    if (loading) {
      return <Loading/>;
    }
  
    if (error) {
      toast.error(error);
      return <div>Error: {error}</div>;
    }
  
    if (data.length === 0) {
      return <div>No service available</div>;
    }

    return (
        <div className='min-h-screen md:p-5 py-2 px-5 
        border-red-500  
         flex items-start justify-center'>
            <div className="min-w-full dark:shadow-none box-border relative flex flex-col md:flex-row max-md:space-y-5">
                <div className="md:w-1/4 z-20 w-full max-md:overflow-auto md:h-full sticky top-0 shadow-xl dark:shadow-none shadow-gray-400
                  flex flex-row md:flex-col  bg-white dark:bg-gray-900 rounded-xl
                  max-md:space-x-3 p-3 md:space-y-3
                 dark:border-white border-black  md:justify-start items-center md:dark:border-r-2">
                    {data?.services.map((tab, index) => (
                        <button
                            key={index}
                            className={` ${activeTab === tab.title ? 
                                ' md:h-[70px]    rounded-xl text-white  md:w-full p-2  font-bold bg-sky-600  box-border cursor-pointer   transition-all flex justify-center items-center' 
                                : ' md:h-[70px]  p-2  rounded-xl  md:w-full hover:bg-sky-600 cursor-pointer transition-all  box-border flex justify-center items-center'}`}
                            onClick={() => handleTabClick(tab.title)}
                        >
                            
                            <h1 className='md:text-lg  max-sm:text-sm text-xs   md:w-full'>{tab.title}</h1>
                        </button>
                    ))}
                </div>

                <div className="w-full md:w-3/4 h-full dark:text-white items-center justify-center flex-1 text-sm md:text-lg font-sans tracking-wider leading-6">
                    {activeService && (
                        <div className='flex  justify-center items-center relative flex-col w-full'>
                            <div className='lg:w-[500px] w-full h-[300px] p-5 text-5xl text-white rounded-xl'>
                                <img src={activeService.image} alt="" className='w-full h-full rounded-xl object-cover'/>
                            </div>
                            <div className='flex-1 flex-wrap '>
                                <div className="p-3 max-w-2xl mx-auto w-full post-content" 
                                dangerouslySetInnerHTML={{ __html: activeService.content }} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CalismaAlanlari;
