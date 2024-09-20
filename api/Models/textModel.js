import mongoose from 'mongoose';

const textSchema = new mongoose.Schema(
  {
    
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
     
    },
    image: {
      type: String,
      default:null
    },
    userId:{
      type:String,
      required:true,
    }
    
  },
  { timestamps: true }
);

const Text = mongoose.model('Text', textSchema);

export default Text;