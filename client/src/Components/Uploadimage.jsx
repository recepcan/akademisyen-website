import React, { useEffect, useState } from 'react';

function UploadImage() {
  const [image, setImage] = useState(null);
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    getImages();
  }, []);

  const submitImage = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("file", image);
  
    try {
      const response = await fetch("/api/images/upload-image", { // Önüne `/` eklemeyi unutmayın
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Görsel yüklenirken hata oluştu.");
      }
  
      const result = await response.json();
      console.log(result);
  
      getImage(); // Yeni yüklenen resmi getirmek için
    } catch (error) {
      console.error("Hata:", error);
    }
  };
  const onInputChange = (e) => {
    setImage(e.target.files[0]);
  };

  const getImages = async () => {
    try {
      const response = await fetch("/api/images/get");
      if (!response.ok) {
        throw new Error("Error fetching images");
      }

      const result = await response.json();
      setAllImages(result.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={submitImage}>
        <input type="file" accept="image/*" onChange={onInputChange} />
        <button type="submit">Upload Image</button>
      </form>
      {allImages.length > 0 && allImages.map((data) => (
        <img key={data._id} src={`${data.image}`} alt="Uploaded" height={100} width={100} />
      ))}
    </div>
  );
}

export default UploadImage;
