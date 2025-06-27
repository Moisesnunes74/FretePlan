import { connect } from 'http2';
import mysql from 'mysql2/promise';

export async function conectarBd() {
    const connection =  await mysql.createConnection(
        {
    host: 'tramway.proxy.rlwy.net',
    user: 'root',
    password: 'KlBUbcYgypweeQjOJxCzQgbmHoJcKWoo',
    database: 'railway',
    port: 28256
     }
)

    if (!connection) {
        console.error('Erro ao conectar ao banco de dados');
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso!');


return connection;
}