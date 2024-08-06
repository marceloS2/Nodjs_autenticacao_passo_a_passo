const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../module/user');

const SECRET_KEY = 'your_secret_key'; // Substitua pelo seu segredo real

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Encontre o usuário pelo email
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        // Compare a senha fornecida com o hash armazenado
        bcrypt.compare(senha, user.senha, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao processar a solicitação' });
            }
            if (!result) {
                return res.status(401).json({ error: 'Email ou senha incorretos' });
            }

            // Crie um token JWT
            const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

            res.status(200).json({ token });
        });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao processar a solicitação' });
    }
});

module.exports = router;
