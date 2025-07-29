import {conectarBd} from '../bd.js';

export async function verificarEmail(email) {
    const connection = await conectarBd();
    const query = 'SELECT * FROM usuario WHERE email = ?';
    const valores = [email];
    const [rows] = await connection.execute(query, valores);    
    return rows;
}  

export async function armazenarCodigoVerificacao (email, codigo, expiracao) {
    const connection = await conectarBd();
    const query = 'INSERT INTO VERIFICACOES (email, codigo, expiracao) VALUES (?, ?, ?)';
    const valores = [email, codigo, expiracao];
    await connection.execute(query, valores);
}

export async function validarCodigoVerificacao (email, codigo){
    const connection = await conectarBd();
    const query = 'SELECT * FROM VERIFICACOES WHERE email = ? AND codigo = ? AND expiracao > NOW()';
    const valores = [email, codigo];
    const [rows] = await connection.execute(query, valores);

    return rows;
}