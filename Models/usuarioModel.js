import {conectarBd} from '../bd.js';

export async function salvarUsuario(nome_completo, senha, email, ddtelefone, telefone, data, genero, estado, cidade) {
    const connection  = await conectarBd();
    const query = 'INSERT INTO USUARIO (nome_completo, senha, email, ddtelefone, telefone, data, genero, estado, cidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const valores = [nome_completo, senha, email, ddtelefone, telefone, data, genero, estado, cidade];

    await connection.execute (query, valores)
}