import mongoose from 'mongoose';

const galeriSchema = new mongoose.Schema(
  { userId: {
    type: String,
    required: true,
  },
    title: {
      type: String,
      default:''
    },
    image: {
      type: String,
      default:null,
      required:true
        },
    category: {
      type: String,
      default: '16/9',
    }
  },
  { timestamps: true }
);

const Image = mongoose.model('Image', galeriSchema);

export default Image;

// 'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
   