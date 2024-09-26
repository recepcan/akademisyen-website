import User from '../Models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '24h' } // Explicit 24 hours
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        })
        .json(rest);
    } else if (!user) {
      console.log("there is no account the name of ...");
      res.redirect('/');  // Make sure you're using res.redirect, not plain redirect
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '24h' } // Explicit 24 hours
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};


export const signOut = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};


export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      if(!user.isAdmin){
        return res.status(404).json({ message: "User not admin" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'recepcn61@gmail.com', // Gmail adresiniz
          pass: process.env.GMAIL_PASS     // Google'dan aldığınız uygulama parolası
        }
      });
    
      const mailOptions = {
        from: 'recepcn61@gmail.com', // Gönderen e-posta adresi
        to:'recepcn61@gmail.com',   // Alıcı e-posta adresi
        subject: 'Reset Password',    // E-posta konusu
        text:'bu bağlantıyı takip ederek şifreyi yenileyebilirsiniz' , // Düz metin içeriği
        html: `bu bağlantıyı takip ederek şifreyi yenileyebilirsiniz:  http://localhost:5173/reset-password/${user._id}/${token}` // HTML içeriği
      };
      
      // E-postayı gönder
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return next(error);
        }
        else{
          console.log('Mesaj gönderildi: %s', info.messageId);
        res.send({status:'success'})
        redirect('/sign-in')
        }
      });
  } catch (error) {
      next(error);
  }
};


export const resetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Yeni şifreyi hashle
    const newPassword = await bcryptjs.hash(password, 10);

    // Kullanıcının şifresini güncelle
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      { password: newPassword },
      { new: true } // Güncellenmiş kullanıcıyı döndür
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    if(!updatedUser.isAdmin){
      return res.status(404).json({ message: "User not admin" });
    }

    res.status(200).json({ message: 'Password updated successfully' });

  } catch (error) {
    next(error); // Hata oluşursa bir sonraki hata işleyiciye iletin
  }
};