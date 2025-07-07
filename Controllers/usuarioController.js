import {salvarUsuario} from "../Models/usuarioModel.js";
import { buscarUsuario } from "../Models/usuarioModel.js";

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

export async function loginUsuario(req, res) {
    const {email, senha} = req.body;

    try {
        const usuario = await buscarUsuario(email, senha);

        if (usuario === 0) {
            return res.status(400).json({ message: "Email ou senha incorretos." });
        }

        res.status(200).json({ message: "Login realizado com sucesso!", usuario });
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        res.status(500).json({ message: "Erro ao realizar login." + error.message });
    }
}