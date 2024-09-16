// import React from 'react'
// import GetPublications from '../../Components/GetPublications'

// function Akademik() {
//   return (
//     <div className='min-h-screen flex flex-col items-center py-5'>

//     <h1 className='text-3xl font-bold p-5'>Publications</h1>
//     <div className='bg-white dark:bg-gray-900 dark:shadow-none w-[90%] rounded-2xl 
//     min-h-screen flex py-5 px-20 shadow-lg shadow-gray-500 '>
//     <div className='w-1/3 flex flex-col bg-gray-100'>
//     makaleler
//     <GetPublications/>
//     </div>

//     <div className='w-1/3 bg-gray-300'>
// Bildiriler    
// </div>

//     <div className='w-1/3  bg-gray-500'>
//     Kitap Bölümleri
//     </div>

//     </div>
   
//     </div>
//   )
// }

// export default Akademik


import React from 'react';
import GetPublications from '../../Components/GetPublications';

function Akademik() {
  return (
    <div className="min-h-screen flex flex-col items-center py-5">
      <h1 className="text-3xl font-bold p-5">Publications</h1>
      <div
        className="bg-white dark:bg-gray-900 dark:shadow-none w-[90%] rounded-2xl 
        min-h-screen flex py-5 px-20 shadow-lg shadow-gray-500  space-x-5"
      >
        <div className="w-1/3 flex flex-col items-center  ">
          <h2 className='text-xl font-semibold py-10 '>Bilimsel Yayın ve Makaleler</h2>
          <GetPublications category="makale" />
        </div>

        <div className="w-1/3 flex flex-col items-center ">
        <h2 className='text-xl font-semibold py-10 '>Kongre ve Sempozyum Bildirileri</h2>
          <GetPublications category="bildiri" />
        </div>

        <div className="w-1/3 flex flex-col items-center ">
        <h2 className='text-xl font-semibold py-10 '>Kitap ve Kitap Bölümleri</h2>
          <GetPublications category="kitap" />
        </div>
      </div>
    </div>
  );
}

export default Akademik;
