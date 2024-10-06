import jwt from 'jsonwebtoken';
import { errorHandler } from './errorHandler.js';
import { signOut } from '../Controller/userAuthController.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  
  if (!token) {
    // Token yoksa yetkisiz hatası döndürüyoruz
    return next(errorHandler(401, 'Unauthorized - Token Bulunamadı'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Token süresi dolmuşsa kullanıcıyı çıkış yaptır ve /giris-yap sayfasına yönlendir
      if (err.name === 'TokenExpiredError') {
        // Token süresi dolduğunda signOut fonksiyonunu çağır
        return signOut(req, res, next, true); // Yönlendirme isteği ile
      } 
      
      // Diğer token hataları için özel bir hata mesajı
      return next(errorHandler(401, 'Bu yetkiye sahip değilsiniz!'));
    }
    
    req.user = user;
    next();
  });
};
