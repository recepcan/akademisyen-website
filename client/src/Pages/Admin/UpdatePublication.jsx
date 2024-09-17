import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import { Button } from 'flowbite-react';

function UpdatePublication() {
  const { publicationId } = useParams();
  const [formData, setFormData] = useState({
    content: '',
    category: '',
    tarih: '',  // Tarih için başlangıçta boş string
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Veriyi çekmek için useEffect
  useEffect(() => {
    const fetchPublicationById = async () => {
      try {
        const res = await fetch(`/api/publication/getPublication/${publicationId}`);
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message);
          return;
        }

        // Veriyi formData state'ine set et
        setFormData({
          content: data.content || '',
          category: data.category || '',
          tarih: data.tarih ? new Date(data.tarih).toISOString().split('T')[0] : '',  // Tarihi formatla
        });
        setLoading(false);
      } catch (error) {
        toast.error('Veri çekilirken hata oluştu: ' + error.message);
      }
    };

    fetchPublicationById();
  }, [publicationId]);

  const handleChange = (value, field) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/publication/updatePublication/${publicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success('Publication updated successfully');
      navigate(`/publication/${publicationId}`);
    } catch (error) {
      toast.error('Güncelleme sırasında hata oluştu: ' + error.message);
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className='p-5 max-w-3xl mx-auto min-h-screen lg:pt-20 space-y-5'>
      <h1 className='text-center text-3xl lg:text-5xl font-semibold font-inter'>
        Update Publication
      </h1>
      <form className='flex flex-col gap-4 space-y-5' onSubmit={handleSubmit}>
        <div className='border-red-500 lg:h-80 h-72'>
          <ReactQuill
            value={formData.content}
            theme='snow'
            placeholder='Write your content here...'
            className='lg:h-72 h-52 dark:text-white'
            onChange={(value) => handleChange(value, 'content')}
          />
        </div>
        <div className='w-full space-x-3 flex'>
          <input
            onChange={(e) => handleChange(e.target.value, 'tarih')}
            type="date"
            id='tarih'
            value={formData.tarih} // Tarih değerini formData'dan al
            className='flex-1 p-2 w-1/2 dark:bg-gray-900 border border-black dark:border-white rounded-lg font-bold outline-1'
          />
          <select
            onChange={(e) => handleChange(e.target.value, 'category')}
            id='category'
            value={formData.category} // Kategori değerini formData'dan al
            className='flex-1 p-2 w-1/2 dark:bg-gray-900 border border-black dark:border-white rounded-lg font-bold outline-1'
          >
            <option value='bildiri'>Bildiri</option>
            <option value='kitap'>Kitap</option>
            <option value='makale'>Makale</option>
          </select>
        </div>
        <Button
          type='submit'
          gradientDuoTone='greenToBlue'
          size='xl'
          outline
        >
          Update
        </Button>
      </form>
    </div>
  );
}

export default UpdatePublication;
