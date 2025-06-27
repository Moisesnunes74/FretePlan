import {salvarUsuario} from "../Models/usuarioModel.js";

export async function cadastrarUsuario(req, res) {
    const {nome_completo, senha, email, ddtelefone, telefone, data, genero, estado, cidade} = req.body;

    try {
        await salvarUsuario(nome_completo, senha, email, ddtelefone, telefone, data, genero, estado, cidade);
        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).json({ message: "Erro ao cadastrar usuário." + error.message });
    }
}