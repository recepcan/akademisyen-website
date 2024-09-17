import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema(
  {
    
    content: {
      type: String,
      required: true,
      
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
    
    tarih: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true } 
);

const Publication = mongoose.model('Publication', publicationSchema);

export default Publication;

// authors: {
//       type: String,
//       required: true,
//     },
//     link: {
//       type: String,
//       required: false,
//     },


//     dergi: {
//       type: String,
//       required: false,
//     },