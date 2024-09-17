


import React from 'react';
import GetPublications from '../../Components/GetPublications';

function Akademik() {
  return (
    <div className="min-h-screen flex flex-col items-center py-5">
      <h1 className="text-3xl font-bold p-5">Publications</h1>
      <div
        className="bg-white dark:bg-gray-900 dark:shadow-none w-[95%] rounded-2xl 
        min-h-screen flex flex-col md:flex-row py-5 px-10 shadow-lg shadow-gray-500 
         max-md:space-y-5 md:space-x-10 border md:justify-center"
      >
        <div className="md:w-1/3 w-full flex flex-col ">
          <h2 className='text-xl font-semibold py-10 text-center'>Bilimsel Yayın ve Makaleler</h2>
          <GetPublications category="makale" />
        </div>

        <div className="md:w-1/3  w-full flex flex-col ">
        <h2 className='text-xl font-semibold py-10 text-center'>Kongre ve Sempozyum Bildirileri</h2>
          <GetPublications category="bildiri" />
        </div>

        <div className="md:w-1/3 w-full flex flex-col  ">
        <h2 className='text-xl font-semibold py-10 text-center'>Kitap ve Kitap Bölümleri</h2>
          <GetPublications category="kitap" />
        </div>
      </div>
    </div>
  );
}

export default Akademik;
