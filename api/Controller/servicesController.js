import Service from '../Models/services.js';
import { errorHandler } from '../utils/errorHandler.js';

export const create = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a post'));
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }
   
    const newService = new Service({
        ...req.body,
        userId: req.user.id,
    });
    try {
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        next(error);
    }
};

export const getservices=async(req, res, next)=>{
    try {
      const services = await Service.find({
        ...(req.query.userId && { userId: req.query.userId }),
       ...(req.query.serviceId && { _id: req.query.serviceId }),
      }) 
     
      res.status(200).json({
        services
      });
  } catch (error) {
      next(error);
  }
  }
  


export const updateservice = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this post'));
    }
    try {
        const updatedservice = await Service.findByIdAndUpdate(
            req.params.serviceId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    image: req.body.image,
                },
            },
            { new: true }
        );
        res.status(200).json(updatedservice);
    } catch (error) {
        next(error);
    }
};



export const deleteservice = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this post'));
    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json('The post has been deleted');
    } catch (error) {
        next(error);
    }
};