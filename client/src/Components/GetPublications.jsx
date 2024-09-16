import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


function GetPublications({ category }) {
  const { currentUser } = useSelector((state) => state.user);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPublications = async () => {
    try {
      const response = await fetch(`/api/publication/getPublications?userId=${currentUser._id}&category=${category}`, 
        {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch publications');
      }

      const data = await response.json();

      // Verileri tarih alanına göre sıralıyoruz
      const sortedPublications = data.publications.sort((a, b) => {
        const dateA = new Date(a.tarih); // tarih alanını kullanıyoruz
        const dateB = new Date(b.tarih); // tarih alanını kullanıyoruz
        return dateB - dateA; // Azalan sıralama
      });

      setPublications(sortedPublications);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, [category, currentUser._id]);

  const formatYear = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
    <ul className='space-y-3'>
      {publications.map((pub) => (
        <li key={pub._id} className='list-disc tracking-wider leading-6'>
          <h2 className='font-bold text-xs leading-6'>
            {pub.authors}
            <span className='text-xs'>
              {pub.tarih ? formatYear(pub.tarih) : 'No Date'}
            </span>
          </h2>

          <p className='font-bold leading-6 text-[#666] dark:text-gray-300'>
            {pub.content}
            {pub.dergi && (
              <span className='text-xs dark:text-gray-300 font-thin'>
                {pub.dergi}
              </span>
            )}
          </p>

          {pub.link && (
            <a
              className='text-sm text-sky-700 dark:text-sky-400 hover:underline'
              href={pub.link}
            >
              {pub.link}
            </a>
          )}

          <br />
        </li>
      ))}
    </ul>
  </div>
  );
}

export default GetPublications;
