import {alterarSenha, salvarUsuario} from "../Models/usuarioModel.js";
import {buscarUsuario } from "../Models/usuarioModel.js";
import {verificarUsuarioExistente} from "../Models/usuarioModel.js";
import {enviarCodigoCadastro} from "./emailController.js";


export async function cadastrarUsuario(req, res) {
    const {nome_completo, senha, email, dddtelefone, telefone, data_nascimento, genero, estado, cidade} = req.body;

    try {
        // Verifica se o usuário já existe
        const usuarioExistente = await verificarUsuarioExistente(email, telefone);
        if (usuarioExistente.length > 0) {
            return res.status(400).json({ message: "Usuário já cadastrado." });
        }

        await enviarCodigoCadastro(email);

        await salvarUsuario(nome_completo, senha, email, dddtelefone, telefone, data_nascimento, genero, estado, cidade);
        await 
        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).json({ message: "Erro ao cadastrar usuário." + error.message });
    }
}

export async function loginUsuario(req, res) {
    const {senha, email} = req.body;

    try {
        const usuario = await buscarUsuario(senha, email);

        if (usuario.length < 0) {
            return res.status(400).json({ message: "Email ou senha incorretos." });
        }

        res.status(200).json({ message: "Login realizado com sucesso!"});
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        res.status(500).json({ message: "Erro ao realizar login." + error.message });
    }
}

export async function alterarSenhaUsuario(req, res) {
    const {senha, email} = req.body;

    try {
        await alterarSenha(senha, email);
        res.status(200).json({ message: "Senha alterada com sucesso!" });
    } catch (error) {
        console.error("Erro ao alterar email:", error);
        res.status(500).json({ message: "Erro ao alterar senha." + error.message });
    }
}