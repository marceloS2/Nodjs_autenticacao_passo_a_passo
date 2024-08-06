const express = require('express');
const router = express.Router();
const { createUserPart1, completeUserRegistration } = require('../module/user');

router.post('/register1', async (req, res) => {
    const { nome, sobrenome, cpf, email } = req.body;
    try {
        const user = await createUserPart1({ nome, sobrenome, cpf, email });
        res.status(201).json({ id: user.id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/register2', async (req, res) => {
    const { id, estado, cidade, senha, confirmSenha } = req.body;
    try {
        await completeUserRegistration({ id, estado, cidade, senha, confirmSenha });
        res.status(200).json({ message: 'Registrado com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
