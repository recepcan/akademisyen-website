import mongoose from 'mongoose';

const ServicesSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    content: {
      type: String,
      required: true,
    }
    ,
    image: {
      type: String,
      default:null
         }
    
  },
  { timestamps: true }
);

const Service = mongoose.model('Service', ServicesSchema);

export default Service;


// 'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
   