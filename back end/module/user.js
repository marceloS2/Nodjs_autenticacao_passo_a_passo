const bcrypt = require('bcrypt');
const db = require('../config/db');

const saltRounds = 10;

// Função para criar a primeira parte do registro
const createUserPart1 = ({ nome, sobrenome, cpf, email }) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
            if (err) {
                return reject(err);
            }
            if (row) {
                return reject(new Error('Email já está registrado'));
            }

            db.run('INSERT INTO users (nome, sobrenome, cpf, email) VALUES (?, ?, ?, ?)',
                [nome, sobrenome, cpf, email],
                function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve({ id: this.lastID });
                });
        });
    });
};

// Função para completar o registro do usuário
const completeUserRegistration = ({ id, estado, cidade, senha, confirmSenha }) => {
    return new Promise((resolve, reject) => {
        if (senha !== confirmSenha) {
            return reject(new Error('As senhas não coincidem'));
        }

        bcrypt.hash(senha, saltRounds, (err, hash) => {
            if (err) {
                return reject(err);
            }

            db.run('UPDATE users SET estado = ?, cidade = ?, senha = ? WHERE id = ?',
                [estado, cidade, hash, id],
                function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
        });
    });
};

// Função para encontrar usuário por e-mail
const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    });
};

// Função para encontrar usuário por ID
const findUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    });
};

module.exports = { createUserPart1, completeUserRegistration, findUserByEmail, findUserById };
