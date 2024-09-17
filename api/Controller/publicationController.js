import Publication from '../Models/publicationModel.js'
import { errorHandler } from '../utils/errorHandler.js';
import mongoose from 'mongoose';  // MongoDB ObjectId doğrulama için

export const create = async (req, res, next) => {
  if (!req.user && !req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }
  // if (!req.body.content || !req.body.authors) {
  //   return next(errorHandler(400, 'Please provide all required fields'));
  // }
  
  if (!req.body.content ) {
       return next(errorHandler(400, 'Please provide all required fields'));
    }

  const newPublication = new Publication({
    ...req.body,
    userId: req.user.id,
    researchDate: req.body.tarih ? new Date(req.body.tarih) : null, // Tarih formatını Date objesine çevir
  });

  try {
    const savedPublication = await newPublication.save();
    res.status(201).json(savedPublication);
  } catch (error) {
    next(error);
  }
};




export const getPublications = async (req, res, next) => {
  const { userId, category } = req.query;

  try {
    let query = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    const publications = await Publication.find(query);
    res.status(200).json({ publications });
  } catch (error) {
    next(error);
  }
};

export const deletepublication = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to delete this post'));
  }
  try {
      await Publication.findByIdAndDelete(req.params.publicationId);
      res.status(200).json('The post has been deleted');
  } catch (error) {
      next(error);
  }
};





// ID'ye göre publication verisini çekme fonksiyonu
export const getPublicationById = async (req, res, next) => {
  const { publicationId } = req.params;

  try {
    const publication = await Publication.findById(publicationId);

    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    res.status(200).json(publication);  // publication verisini döndür
  } catch (error) {
    next(error);  // Hata durumunda error middleware'ine yönlendirilir
  }
};





export const updatePublication = async (req, res, next) => {
  // Kullanıcının admin olup olmadığını ve kendi yayını güncelleyip güncelleyemeyeceğini kontrol et
  if (!req.user.isAdmin || req.user.id !== req.user.id) {
    return next(errorHandler(403, 'You are not allowed to update this post'));
  }

  try {
    // Publication'ı bul ve güncelle
    const updatedPublication = await Publication.findByIdAndUpdate(
      req.params.publicationId,  // Parametre olarak gelen publication ID'ye göre veriyi bul
      {
        $set: {
          content: req.body.content,
          category: req.body.category,
          tarih: req.body.tarih,
        },
      },
      { new: true }  // Güncellenen veriyi döndürmek için new: true kullan
    );

    if (!updatedPublication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    res.status(200).json(updatedPublication);
  } catch (error) {
    next(error);  // Hata durumunda error middleware'ine yönlendirilir
  }
};
