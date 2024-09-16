import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function GetPublications() {
  // Move state declarations outside the fetch function
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const fetchPublications = async () => {
    try {
      const response = await fetch(`/api/publication/getPublications?userId=${currentUser._id}`, {
        method: 'GET', // Specify the GET method
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch publications');
      }

      const data = await response.json();
      console.log('Fetched data:', data);
      setPublications(data.publications); // Assuming data.publications contains the list
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load publications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchPublications();
    }
  }, [currentUser]); // Add currentUser to the dependency array

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='w-full font-titillium  p-2 rounded-lg flex flex-col items-center justify-center'>
     <h1 className='font-bold text-xl py-5 '>BAZI AKADEMİK YAYINLARI</h1>
      <ul className='space-y-3'>
        {publications.map((pub) => (
          <li key={pub._id} className='list-disc tracking-wider leading-6'>
            <h1 className='font-bold text-xs  leading-6'> {pub.authors} <span className=' leading-6 text-[#666] dark:text-gray-300 font-thin'> {pub.content}</span> </h1>
             
            {pub.link && (
              <>
                 <a className='text-sm text-sky-700 dark:text-sky-400 hover:underline '  href={pub.link}>{pub.link}</a>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetPublications;
