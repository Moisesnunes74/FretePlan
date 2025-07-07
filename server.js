import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import usuarioRoutes from './Routes/usuarioRoutes.js';
import { conectarBd } from './bd.js';

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

conectarBd();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'home.html'));
})

app.get ('/usuario/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'paginaCadastro.html'));
})

app.get ('/usuario/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'paginaLogin.html'));
})

app.use('/usuario', usuarioRoutes);

app.listen (port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})
