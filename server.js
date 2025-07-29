import express from 'express';
import path from 'path';
import session from 'express-session';
import { fileURLToPath } from 'url';

import usuarioRoutes from './Routes/usuarioRoutes.js';


const app = express();
const port = 3000;

// Configuração do middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'freteplan-super-secreto', 
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Rotas 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'home.html'));
})

app.get ('/usuario/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'paginaCadastro.html'));
})

app.get ('/usuario/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'paginaLogin.html'));
})

app.get ('/usuario/enviarCodigo', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'paginaRecuperacaoSenha.html'));
})

app.get ('/usuario/verificarCodigo', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'paginaVerificarCodigo.html'));  
})

app.get ('/usuario/alterarSenha', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'paginaAlterarSenha.html'));

})

// Usando as rotas 
app.use('/usuario', usuarioRoutes);

app.listen (port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})
