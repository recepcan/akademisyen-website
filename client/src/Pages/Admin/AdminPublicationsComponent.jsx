import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublications } from '../../redux/publicationSlice';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaCaretDown } from "react-icons/fa";
import {toast }from 'react-toastify'
import Loading from '../../Components/Loading';
function AdminPublicationsComponent() {

    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { data, loading, error } = useSelector(state => state.publications);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [publicationIdToDelete, setPublicationIdToDelete] = useState('');
    const [category, setCategory] = useState('makale');

    useEffect(() => {
      
            dispatch(fetchPublications({category}));

        

    }, [dispatch,category]);

    console.log('Component data:', data);



    const handleDeletePost = async () => {
        setShowModal(false);
        try {
          const res = await fetch(
            `/api/publication/deletePublication/${publicationIdToDelete}/${currentUser._id}`,
            {
              method: 'DELETE',
            }
          );
          const data = await res.json();
          if (!res.ok) {
            toast.error(data.message);
          } else {
            
              dispatch(fetchPublications({category}));
  
         
           
          }
        } catch (error) {
          toast.error(error)
        }
      };
const changeCategory=(e)=>{
    setCategory(e.target.value)
    console.log(category)
}
if(loading) return <Loading/>
if(error) return <div>Error: {error}</div>
    return (
        <div className='flex-1  border-black   overflow-hidden overflow-x-auto'>
        
          <div className='flex   border-red-500 flex-col max-md:min-w-[800px]  md:w-full'>
            <div className='shadow-md flex-1   border-red-500'>
              <div className='flex justify-evenly  rounded-tl-lg rounded-tr-lg'>
                <div className='p-5 w-2/6 bg-gray-500 text-white 
                transition-all  flex items-center justify-center font-extrabold rounded-tl-sm '>
                  content
                </div>
                <div className='p-5 w-1/6 bg-gray-500 text-white
                 transition-all  flex items-center justify-center font-extrabold  '>
                  Date
                </div>
               
                
                <select
                value={category}
                onChange={changeCategory}
                className=" p-5 w-1/6 bg-white 
                transition-all  flex items-center justify-center font-extrabold    border border-gray-300  focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm appearance-none"
 
                >
                  <option value="makale">makale </option>
                  <option value="bildiri">bildiri </option>
                  <option value="kitap">kitap </option>
                  
                </select>
                    
               
                <div className='p-5 w-1/6 bg-red-700 flex text-white
                 hover:bg-red-500  transition-all items-center justify-center font-extrabold'>
                  Delete
                </div>
                <div className='p-5 w-1/6 bg-sky-700 flex  text-white
                 hover:bg-sky-400 transition-all items-center justify-center font-extrabold rounded-tr-sm '>
                  <span>Edit</span>
                </div>
              </div>
              {data?.publications?.map((pub,index) => (
                <div key={index} className=''>
                  <div className='bg-white dark:bg-[#1a2e44] dark:text-white items-center border-b  border-gray-300 grid grid-cols-6 h-32 justify-center dark:border-gray-700  '>
                    <div className=' h-24  border-black flex items-center justify-center col-span-2 '>
                        <div
                            className='p-3 col-span-2  font-titillium text-xs dark:bg-transparent dark:text-white flex-wrap   post-content overflow-hidden'
                            dangerouslySetInnerHTML={{ __html: pub && pub.content }}>

                        </div>
                    </div>
                    <div className=' h-24   border-black flex items-center justify-center col-span-1'>
                      <Link to={`/publication/${pub.slug}`}>
                      <h2>{new Date(pub.tarih).toLocaleDateString()}</h2>
                      </Link>
                    </div>
                    
                    <div className='h-24   border-black flex items-center justify-center  col-span-1'>{pub.category}</div>
                    <div className='h-24   border-black flex items-center justify-center col-span-1'>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setPublicationIdToDelete(pub._id);
                        }}
                        className='font-medium text-red-500 hover:underline cursor-pointer'
                      >
                        Delete
                      </span>
                    </div>
                    <div className='h-24   border-black flex items-center justify-center col-span-1'>
                      <Link
                        className='text-teal-500 hover:underline'
                        to={`/update-publication/${pub._id}`}
                      >
                        <span>Edit</span>
                      </Link>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        
          {(!currentUser.isAdmin || !(data?.publications?.length > 0)) && ( 
            <div>
                <h1>{category} kategorisinde gösterilecek hiçbir şey bulunamadı, lütfen başka bir kategori seçin!</h1>
            </div>
        )}


        {showModal &&
          <div
            className='flex items-center justify-center  rounded-lg p-2 absolute min-h-svh left-0 right-0 bottom-0 top-0 z-50  bg-black/50'
  
          >
  
            <div />
            <div className='bg-gray-200 p-20 relative rounded-lg  border-2 border-sky-500'>
              <button className='text-red-500 text-3xl absolute right-2 top-2' 
              onClick={() => setShowModal(false)}> <AiFillCloseCircle /></button>
              <div className='text-center'>
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                  Are you sure you want to delete this post?
                </h3>
                <div className='flex justify-center gap-4'>
                  <button className='bg-red-600 rounded-lg p-2 text-white font-sans font-bold'
                   onClick={handleDeletePost}>
                    Yes, I'm sure
                  </button>
                  <button className='bg-sky-600 rounded-lg p-2 text-white font-sans font-bold' onClick={() => setShowModal(false)}>
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
}

export default AdminPublicationsComponent

