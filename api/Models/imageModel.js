import mongoose from 'mongoose';

// Modeli yalnızca bir kez tanımlamak için
const imageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

// Modelin zaten var olup olmadığını kontrol et
const Images = mongoose.models.Image || mongoose.model('Image', imageSchema);

export default Images;
