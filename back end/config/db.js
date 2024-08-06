const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        sobrenome TEXT NOT NULL,
        cpf TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        estado TEXT NOT NULL,
        cidade TEXT NOT NULL,
        senha TEXT NOT NULL,
        resetToken TEXT NOT NULL,
        resetTokenExpires INTEGER
    )`);
});

module.exports = db;
