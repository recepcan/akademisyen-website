import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTextById } from '../../redux/textsSlice'
import Loading from '../../Components/Loading'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
function Iletisim() {
  // Form inputları için state'leri tanımlıyoruz
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telefon: '',
    iletisim: 'Telefon',
    message: ''
  });

  const navigate=useNavigate()
  const { textByIdError, textByIdLoading, textById } = useSelector(state => state.texts);
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  // onChange event handler'ı - ID'ye göre yakalayıp state'i güncelliyoruz
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, name, message } = formData;
  
    if (!email || !name || !message) {
      return toast.error('Lütfen bütün alanları doldurun');
    }
  
    try {
      const res = await fetch('/api/contact/message', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
  
        if (!res.ok || data.success === false) {
          return toast.error(data.message || "Bir hata oluştu");
        }
  
        toast.success(data.message || "Mesajınız başarıyla iletildi");
        navigate('/');
      } else {
        throw new Error("Sunucu JSON formatında bir yanıt döndürmedi.");
      }
  
    } catch (error) {
      toast.error("Bir hata oluştu: " + error.message);
    }
  };



  const textId = '66f04e20c1fabe4fdd011488';
  useEffect(() => {
    if (textId) {
      dispatch(fetchTextById(textId));
    }
  }, [dispatch, textId]);

  if (textByIdLoading) return <Loading />;
  if (textByIdError) return <div className='min-h-screen flex items-center justify-center'>Error: {textByIdError}</div>;

  return (
    <div className='min-h-screen border-green-500 p-5'>
      <div className='w-full border-red-500 flex flex-col md:flex-row min-h-[600px] rounded-lg'>

        <form 
          onSubmit={handleSubmit}
          className='md:w-1/2 w-full h-full border-black px-10 py-5
          flex flex-col items-center justify-evenly space-y-5'>
          
          <h1 className='text-3xl font-bold'>Benimle İletişime Geç</h1>

          <input 
            type="text"
            placeholder='ad&soyad'
            id='name'
            value={formData.name}
            onChange={handleChange}
            className='w-full p-3 outline-none border dark:bg-transparent dark:border-white rounded-xl' 
          />

          <input 
            type="email"
            placeholder='E Mail Hesabınız'
            id='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full p-3 outline-none border dark:bg-transparent dark:border-white rounded-xl' 
          />

          <input 
            type="text"
            placeholder='Telefon Numaranız'
            id='telefon'
            value={formData.telefon}
            onChange={handleChange}
            className='w-full p-3 outline-none border dark:bg-transparent dark:border-white rounded-xl' 
          />

          <div className='flex items-center justify-between w-full'>
            <h3>Sizinle Nasıl İletişim Kurmamı İstersiniz?</h3>
            <select
              id="iletisim"
              value={formData.iletisim}
              onChange={handleChange}
              className='rounded-lg outline-none dark:bg-transparent '>
              <option className='dark:text-black' value="Telefon">Telefon</option>
              <option className='dark:text-black' value="E-Mail">E-Mail</option>
            </select>
          </div>

          <textarea 
  placeholder='mesaj'
  id='message'
  value={formData.message}
  onChange={handleChange}
  rows={5}
  className='w-full p-3 outline-none border dark:bg-transparent dark:border-white rounded-xl 
  whitespace-pre-wrap'
/>


          <button 
            type='submit'
            className='p-3 bg-green-500 rounded-lg w-full font-bold text-white'>
            Gönder
          </button>

        </form>

        <div className='md:w-1/2 w-full h-full border-black flex items-center justify-center text-center'>
          <div
            className="p-3 mx-auto w-2/3 post-content backdrop-blur-lg rounded-xl text-white
            bg-gradient-to-tr from-teal-500 via-teal-700 to-teal-900"
            dangerouslySetInnerHTML={{ __html: textById && textById.content }}
          />
        </div>

      </div>
    </div>
  );
}

export default Iletisim;
