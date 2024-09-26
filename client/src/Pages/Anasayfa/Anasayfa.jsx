import React, { useEffect, useState } from 'react';
import Editor from './Editor';
import GetPosts from '../../Components/GetPosts';
import Hakkinda from '../Hakkinda/Hakkinda';
import ProfilCard from './ProfilCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTextById } from '../../redux/textsSlice';
import Loading from '../../Components/Loading';
import { toast } from 'react-toastify';

function Anasayfa() {


  const { textByIdError, textByIdLoading, textById } = useSelector(state => state.texts)
  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch()

  
  const [text, setText] = useState(null);
  

  const textId = '66f1694c41f7db638012b023'
  useEffect(() => {
    const fetchText = async () => {
      try {
          const res = await fetch(`/api/text/getTexts?textId=${textId}`);
          const data = await res.json();
          if (!res.ok) {
              toast.error(data.message);
              return;
          }
          if (res.ok) {
              setText(data.texts[0]);
          }
      } catch (error) {
          toast.error(error.message);
      }
  };
  fetchText();
  }, [dispatch, textId]);

 



  const [width, setWidth] = useState('300px'); // Başlangıç genişliği
  const [height, setHeight] = useState('300px'); // Başlangıç yüksekliği

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Genişlik artışı
      const newWidth = Math.min(window.innerWidth, 600 + scrollY);
      setWidth(`${newWidth}px`);

      // Yükseklik artışı
      const newHeight = Math.min(window.innerHeight, 50 + scrollY);
      setHeight(`${newHeight}px`);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Temizleme
    };
  }, []);

   // if (textByIdLoading) return <Loading />
  // if (textByIdError) return <div className='min-h-screen flex items-center justify-center'>Error: {textByIdError}</div>;
  


  return (
    <div className='min-h-screen p-5 flex flex-col items-center justify-center
     space-y-20 lg:space-y-40  md:py-20'>
      <ProfilCard />

      <div
        style={{ width,height }} // Dinamik genişlik
        className='transition-all duration-1000 ease-out  max-w-full max-h-[400px]  max-lg:hidden  rounded-xl  relative'
      >
      <img src={text?.image} alt="" className='w-full   h-full rounded-xl'/>
       <div className='w-[450px] p-5 dark:shadow-none shadow-lg
        shadow-white h-full bg-white dark:bg-gray-900 
         z-10 absolute left-24 top-0 flex flex-col justify-around items-center'>
       <div
       className="flex flex-col text-center  w-full  leading-6 tracking-wider  post-content"
        dangerouslySetInnerHTML={{ __html: text && text.content }}/>
        <button className='p-3 w-1/2 rounded-lg bg-sky-600 text-white font-bold '>Devamını Oku</button>

       </div>



      </div>

      <div       
        className='max-w-full  rounded-xl  lg:hidden  w-full p-5 dark:shadow-none shadow-lg shadow-white h-full bg-white dark:bg-gray-900  
        flex flex-col justify-around items-center '
      >  
       <div
       className="flex flex-col text-center  w-full  leading-6 tracking-wider  post-content"
        dangerouslySetInnerHTML={{ __html: textById && textById.content }}/>
        <button className='p-3 w-1/2 rounded-lg bg-sky-600 text-white font-bold '>
        Devamını Oku
        </button>
      </div>

      <div className='w-full flex flex-col items-center justify-center'>
        <h1 className='text-5xl font-bold '>
        Blog
        </h1>
        <GetPosts limit={3} />
      </div>
      {/* <Editor /> */}
    </div>
  );
}

export default Anasayfa;