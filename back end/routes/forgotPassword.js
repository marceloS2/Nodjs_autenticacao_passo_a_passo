const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const sendMail = require('../config/mailer');
const db = require('../config/db');

const router = express.Router();

// Função auxiliar para gerar um token
const generateToken = () => crypto.randomBytes(20).toString('hex');

// Função auxiliar para encontrar um usuário por email
const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
};

// Rota para solicitar recuperação de senha
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'Email não encontrado' });
        }

        const token = generateToken();
        const expiration = Date.now() + 3600000; // 1 hora

        // Armazene o token e a data de expiração no banco de dados
        db.run(`UPDATE users SET resetToken = ?, resetTokenExpires = ? WHERE email = ?`, [token, expiration, email], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Erro ao processar a solicitação' });
            }

            const resetUrl = `http://192.168.3.6:8080/reset-password.html?token=${token}`;

            // Envia o e-mail com o token
            sendMail(email, 'Recuperação de Senha', `Clique no link para redefinir sua senha: ${resetUrl}`)
                .then(() => res.status(200).json({ message: 'E-mail de recuperação enviado' }))
                .catch(err => res.status(500).json({ error: 'Erro ao enviar e-mail' }));
        });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao processar a solicitação' });
    }
});

// Rota para redefinir a senha
router.post('/reset-password', async (req, res) => {
    const { token, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: 'Senhas não coincidem' });
    }

    try {
        db.get(`SELECT * FROM users WHERE resetToken = ? AND resetTokenExpires > ?`, [token, Date.now()], async (err, user) => {
            if (err || !user) {
                return res.status(400).json({ error: 'Token inválido ou expirado' });
            }

            const hash = await bcrypt.hash(newPassword, 10);
            db.run(`UPDATE users SET senha = ?, resetToken = NULL, resetTokenExpires = NULL WHERE id = ?`, [hash, user.id], function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao processar a solicitação' });
                }
                res.status(200).json({ message: 'Senha redefinida com sucesso' });
            });
        });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao processar a solicitação' });
    }
});

module.exports = router;
