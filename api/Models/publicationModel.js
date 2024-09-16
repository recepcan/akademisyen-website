import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema(
  {
    authors: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['bildiri', 'kitap', 'makale'], 
      required: true,
    },
    dergi: {
      type: String,
      required: false,
    },
    tarih: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true } 
);

const Publication = mongoose.model('Publication', publicationSchema);

export default Publication;
