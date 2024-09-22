import nodemailer from 'nodemailer';

export const sendMessage = async (req, res, next) => {
  const { email, message, name,telefon,iletisim } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yunusaltundag.com@gmail.com', // Gmail adresiniz
        pass: process.env.GMAIL_PASS  // Google'dan aldığınız uygulama parolası
      }
    });

    const mailOptions = {
      from: 'yunusaltundag.com@gmail.com', // Gönderen e-posta adresi
      to: 'yunusaltundag.com@gmail.com',   // Alıcı e-posta adresi (Kendinize gönderiyorsunuz)
      subject: 'Contact Form',     // E-posta konusu
      html: `<p><strong>Ad&Soyad:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Telefon:</strong> ${telefon}</p>
             <p><strong>İletişim Tercihi:</strong> ${iletisim}</p>
             <p><strong>Message:</strong> ${message}</p>` // HTML içeriği
    };

    // E-postayı gönder
    await transporter.sendMail(mailOptions);
    console.log('Mesaj gönderildi');
    res.status(200).send({ status: 'success' });

  } catch (error) {
    next(error); // Hata oluşursa bir sonraki hata işleyiciye iletin
  }
};