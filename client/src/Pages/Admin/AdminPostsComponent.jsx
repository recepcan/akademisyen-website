import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { fetchPosts } from '../../redux/postsSlice';
import Loading from '../../Components/Loading';
import { getStorage, ref, deleteObject } from "firebase/storage";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null); // Tüm post verisini saklayacağız

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());

    if (data?.posts?.length < 6) {
      setShowMore(false);
    }
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
    return <div>Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div>No posts available</div>;
  }

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete._id}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        dispatch(fetchPosts());
        handleDeleteImage(postIdToDelete.image); // postIdToDelete'den image'i alıyoruz
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getFileNameFromUrl = (url) => {
    const decodedUrl = decodeURIComponent(url);
    const startIndex = decodedUrl.indexOf("/o/") + 3; // '/o/' ifadesinden sonra dosya yolu başlar
    const endIndex = decodedUrl.indexOf("?alt=media"); // '?alt=media' kısmı sonu belirtir
    return decodedUrl.substring(startIndex, endIndex);
  };

  const handleDeleteImage = async (imageUrl) => {
    try {
      const fileName = getFileNameFromUrl(imageUrl);
      const storage = getStorage();
      const imageRef = ref(storage, fileName);

      await deleteObject(imageRef);
      toast.success('Image deleted successfully from storage');
    } catch (error) {
      toast.error('Failed to delete image from storage');
      console.error(error);
    }
  };

  return (
    <div className='flex-1  border-black overflow-hidden overflow-x-auto'>
      {currentUser.isAdmin && data.posts.length > 0 ? (
        <div className='flex border-red-500 flex-col max-md:min-w-[800px] md:w-full'>
          <div className='shadow-md flex-1 border-red-500'>
            <div className='flex justify-evenly rounded-tl-lg rounded-tr-lg'>
              <div className='p-5 w-2/6 bg-gray-500 text-white transition-all flex items-center justify-center font-extrabold rounded-tl-sm'>
                Post Explanation
              </div>
              <div className='p-5 w-1/6 bg-gray-500 text-white transition-all flex items-center justify-center font-extrabold'>
                Post image & Date
              </div>
              <div className='p-5 w-1/6 bg-gray-500 text-white transition-all flex items-center justify-center font-extrabold'>
                Post title
              </div>
              <div className='p-5 w-1/6 bg-red-700 flex text-white hover:bg-red-500 transition-all items-center justify-center font-extrabold'>
                Delete
              </div>
              <div className='p-5 w-1/6 bg-sky-700 flex text-white hover:bg-sky-400 transition-all items-center justify-center font-extrabold rounded-tr-sm'>
                <span>Edit</span>
              </div>
            </div>
            {data?.posts?.map((post, index) => (
              <div key={index}>
                <div className='bg-white dark:bg-[#1a2e44] dark:text-white items-center border-b border-gray-300 grid grid-cols-6 h-32 justify-center dark:border-gray-700'>
                  <div className='h-24 p-1 col-span-2 flex items-center justify-center text-center'>
                    <Link className='font-medium text-gray-900 dark:text-white line-clamp-3 overflow-hidden' to={`/post/${post.slug}`}>
                      {post.explanation}
                    </Link>
                  </div>
                  <div className='h-24 col-span-1 flex items-center justify-center'>
                    <Link to={`/post/${post.slug}`}>
                      <img src={post.image} alt={post.title} className='w-20 h-24 object-cover bg-gray-500' />
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Link>
                  </div>
                  <div className='h-24 col-span-1 flex items-center justify-center'>
                    <Link className='font-medium text-gray-900 text-center dark:text-white line-clamp-3 overflow-hidden' to={`/post/${post.slug}`}>
                      {post.title}
                    </Link>
                  </div>
                  <div className='h-24 col-span-1 flex items-center justify-center'>
                    <span onClick={() => { setShowModal(true); setPostIdToDelete(post); }} className='font-medium text-red-500 hover:underline cursor-pointer'>
                      Delete
                    </span>
                  </div>
                  <div className='h-24 col-span-1 flex items-center justify-center'>
                    <Link className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
                      <span>Edit</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>You have no posts yet!</p>
      )}
      {showModal &&
        <div
          className='flex items-center justify-center  rounded-lg p-2 absolute min-h-svh left-0 right-0 bottom-0 top-0 z-50  bg-black/50'

        >

          <div />
          <div className='bg-gray-200 dark:bg-gray-500 p-20 relative rounded-lg  border-4 border-black dark:border-white '>
            <button className='text-red-600 bg-white rounded-full text-3xl absolute right-2 top-2' onClick={() => setShowModal(false)}> <AiFillCloseCircle /></button>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-yellow-500 dark:text-yellow-300 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg  dark:text-gray-100'>
                Are you sure you want to delete this post?
              </h3>
              <div className='flex justify-center gap-4'>
                <button className='bg-red-600 rounded-lg p-2 text-white font-sans font-bold' onClick={handleDeletePost}>
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
  );
}
