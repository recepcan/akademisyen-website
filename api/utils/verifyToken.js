import jwt from 'jsonwebtoken';
import { errorHandler } from './errorHandler.js';
import { signOut } from '../Controller/userAuthController.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    
    return  next(errorHandler(401, 'Unauthorized-Token Bulunamadı'));
   
    
    
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Bu yetkiye sahip değilsiniz!'));
    }
    req.user = user;
    next();
  });
};