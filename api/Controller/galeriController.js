import Image from '../Models/galeriModel.js';
import { errorHandler } from '../utils/errorHandler.js';

export const create = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a post'));
    }
    if (!req.body.image) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }
   
    const newImage = new Image({
        ...req.body,
        userId: req.user.id,
    });
    try {
        const savedImage = await newImage.save();
        res.status(201).json(savedImage);
    } catch (error) {
        next(error);
    }
};

export const getimages=async(req, res, next)=>{
    try {
      const images = await Image.find({
        ...(req.query.userId && { userId: req.query.userId }),
       ...(req.query.imageId && { _id: req.query.imageId }),
      }) 
     
      res.status(200).json({
        images
      });
  } catch (error) {
      next(error);
  }
  }
  


// export const updateservice = async (req, res, next) => {
//     if (!req.user.isAdmin || req.user.id !== req.params.userId) {
//         return next(errorHandler(403, 'You are not allowed to update this post'));
//     }
//     try {
//         const updatedservice = await Service.findByIdAndUpdate(
//             req.params.serviceId,
//             {
//                 $set: {
//                     title: req.body.title,
//                     content: req.body.content,
//                     image: req.body.image,
//                 },
//             },
//             { new: true }
//         );
//         res.status(200).json(updatedservice);
//     } catch (error) {
//         next(error);
//     }
// };



export const deleteimage = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this post'));
    }
    try {
        await Image.findByIdAndDelete(req.params.imageId);
        res.status(200).json('The post has been deleted');
    } catch (error) {
        next(error);
    }
};