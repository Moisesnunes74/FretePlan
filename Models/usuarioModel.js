import {conectarBd} from '../bd.js';

export async function verificarUsuarioExistente(email, telefone) {
    const connection = await conectarBd();
    const query = 'SELECT * FROM usuario WHERE email = ? AND telefone = ?';
    const valores = [email, telefone];
    const [rows] = await connection.execute(query, valores);   

    return rows
}

export async function salvarUsuario(nome_completo, senha, email, dddtelefone, telefone, data_nascimento, genero, estado, cidade) {
    const connection  = await conectarBd();
    const query = 'INSERT INTO USUARIO (nome_completo, senha, email, dddtelefone, telefone, data_nascimento, genero, estado, cidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const valores = [nome_completo, senha, email, dddtelefone, telefone, data_nascimento, genero, estado, cidade];

    await connection.execute (query, valores)
}

export async function buscarUsuario(senha, email) {
    const connection = await conectarBd();
    const query = 'SELECT * FROM USUARIO WHERE email = ? AND senha = ?';
    const valores = [senha, email];
    const [rows] = await connection.execute(query, valores)
    
    return rows
}

export async function alterarSenha(senha, email) {
    const connection = await conectarBd();
    const query = 'UPDATE USUARIO SET senha = ? WHERE email = ?';
    const valores = [senha, email];
    await connection.execute(query, valores);
}