import Publication from '../Models/publicationModel.js'
import { errorHandler } from '../utils/errorHandler.js';
import mongoose from 'mongoose';  // MongoDB ObjectId doğrulama için

// export const create = async (req, res, next) => {
//     if (!req.user && !req.user.isAdmin) {
//         return next(errorHandler(403, 'You are not allowed to create a post'));
//     }
//     if (!req.body.content || !req.body.authors) {
//       return next(errorHandler(400, 'Please provide all required fields'));
//     }
  
//     const newPublication= new Publication({
//       ...req.body,
//    userId:req.user.id
//     })
  
//     try {
//       const savedPublication = await newPublication.save();
//       res.status(201).json(savedPublication);
//     } catch (error) {
//       next( error);
//     }
//   };

  // export const getPublications=async(req, res, next)=>{
  //   try {
  //     const publications = await Publication.find({
  //       ...(req.query.userId && { userId: req.query.userId }),
  //      ...(req.query.publicationId && { _id: req.query.publicationId }),
  //     }) 
     
  //     res.status(200).json({
  //       publications
  //     });
  // } catch (error) {
  //     next(error);
  // }
  // }





// export const create = async (req, res, next) => {
//   // Admin doğrulaması
//   if (!req.user || !req.user.isAdmin) {
//     return next(errorHandler(403, 'You are not allowed to create a post'));
//   }

//   // Gerekli alanların kontrolü
//   const { content, authors, dergi, tarih, category } = req.body;
//   if (!content || !authors || !dergi || !tarih || !category) {
//     return next(errorHandler(400, 'Please provide all required fields'));
//   }

//   // Yeni yayın oluşturma
//   const newPublication = new Publication({
//     content,
//     authors,
//     dergi,
//     tarih,
//     category,
//     userId: req.user.id, // Kullanıcı ID'si eklenir
//   });

//   try {
//     // Yayını kaydetme
//     const savedPublication = await newPublication.save();
//     res.status(201).json(savedPublication);
//   } catch (error) {
//     next(error);
//   }
// };


export const create = async (req, res, next) => {
  if (!req.user && !req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }
  if (!req.body.content || !req.body.authors) {
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




// export const getPublications = async (req, res, next) => {
//   const { userId, publicationId, category, sortByDate } = req.query;

//   try {
//     // Sorgu nesnesini oluştur
//     let query = {};

//     // Kullanıcı ID'ye göre filtreleme
//     if (userId) {
//       query.userId = userId;
//     }

//     // Yayın ID'sine göre filtreleme
//     if (publicationId) {
//       query._id = publicationId;
//     }

//     // Kategoriye göre filtreleme
//     if (category) {
//       query.category = category;
//     }

//     // Yayınları bulma
//     let publications = await Publication.find(query);

//     // Tarihe göre sıralama (artış yönü veya azalış yönü)
//     if (sortByDate === 'asc') {
//       publications = publications.sort((a, b) => new Date(a.tarih) - new Date(b.tarih));
//     } else if (sortByDate === 'desc') {
//       publications = publications.sort((a, b) => new Date(b.tarih) - new Date(a.tarih));
//     }

//     res.status(200).json({
//       publications,
//     });
//   } catch (error) {
//     next(error);
//   }
// };


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
