const nodemailer = require('nodemailer');

// Substitua estas variáveis pelas informações fornecidas pelo Mailtrap
const mailtrapUser = 'your_mailtrap_username';
const mailtrapPass = 'your_mailtrap_password';

const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: mailtrapUser,
        pass: mailtrapPass
    }
});

const sendMail = (to, subject, text) => {
    return transporter.sendMail({
        from: 'your_email@example.com', // Pode ser qualquer e-mail fictício para testes
        to,
        subject,
        text
    });
};

module.exports = sendMail;
