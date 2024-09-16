import Publication from '../Models/publicationModel.js'
import { errorHandler } from '../utils/errorHandler.js';
import mongoose from 'mongoose';  // MongoDB ObjectId doğrulama için

export const create = async (req, res, next) => {
    if (!req.user && !req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a post'));
    }
    if (!req.body.content || !req.body.authors) {
      return next(errorHandler(400, 'Please provide all required fields'));
    }
  
    const newPublication= new Publication({
      ...req.body,
   userId:req.user.id
    })
  
    try {
      const savedPublication = await newPublication.save();
      res.status(201).json(savedPublication);
    } catch (error) {
      next( error);
    }
  };


  export const getPublications=async(req, res, next)=>{
    try {
      const publications = await Publication.find({
        ...(req.query.userId && { userId: req.query.userId }),
       ...(req.query.publicationId && { _id: req.query.publicationId }),
      }) 
     
      res.status(200).json({
        publications
      });
  } catch (error) {
      next(error);
  }
  }