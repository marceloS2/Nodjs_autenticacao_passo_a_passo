const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const registerRoutes = require('./routes/register');
const authRoutes = require('./routes/auth');
const forgotPasswordRoutes = require('./routes/forgotPassword');

const app = express();
const PORT = 8080;
const HOST = 'localhost';

app.use(cors()); 
app.use(bodyParser.json());
app.use('/api', registerRoutes); //aqui eu to falando que 
app.use('/api', authRoutes);
app.use('/api', forgotPasswordRoutes);

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
