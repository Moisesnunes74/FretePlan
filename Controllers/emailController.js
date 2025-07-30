import { text } from "stream/consumers";
import { conectarEmail } from "../email.js";
import { armazenarCodigoVerificacao } from "../Models/emailModel.js";
import { validarCodigoVerificacao } from "../Models/emailModel.js";
import { verificarEmail } from "../Models/emailModel.js";

import session from "express-session";

// Envia um email de verificação para o usuário
export async function enviarEmailCadastro (email, assunto, mensagem) {
    const transporter = await conectarEmail();
    const mailOptions = {
        from: "freteplan@gmail.com",
        to: email,
        subject: assunto,
        text: mensagem
}

    await transporter.sendMail(mailOptions)
}

export async function enviarCodigoCadastro (email, res) {
    const codigo = Math.floor(10000 + Math.random() * 90000) ; // Gera um código de 6 dígitos
    const expiracao = new Date(Date.now() + 5 * 60000); 

    try {
        await enviarEmailCadastro(email, "Validação de Email", `Seu código de verificação é: ${codigo}`);
        await armazenarCodigoVerificacao(email, codigo, expiracao);
        console.log ("Código de verificação enviado com sucesso.");
    } catch (error) {
        console.error("Erro ao enviar o código de verificação:", error);
        console.log ("Erro ao enviar o código de verificação.");
    }
}

export async function verificarCodigoCadastro(req, res) {
    const {email, codigo} = req.body;
    
    try {
        const resultado = await validarCodigoVerificacao(email, codigo);

        if (resultado.length > 0) {
            res.send("Código de verificação válido.");
        } else {
            res.status(400).send("Código de verificação inválido ou expirado.");
        }
    } catch (error) {
        console.error("Erro ao verificar o código:", error.message);
        res.status(500).send("Erro ao verificar o código.");
    }
}

//Envia um email de recuperação de senha para o usuário
export async function enviarEmailRecuperacaoSenha(email, assunto, mensagem) {
    const transporter = await conectarEmail();
    const mailOptions = {
        from: "freteplan@gmail.com",
        to: email,
        subject: assunto,
        text: mensagem
}
    await transporter.sendMail(mailOptions)
}

export async function enviarCodigoRecuperacaoSenha(req, res) {

    const codigo = Math.floor(10000 + Math.random() * 90000) ; // Gera um código de 6 dígitos
    const expiracao = new Date(Date.now() + 5 * 60000); 
    const email = req.body.email;

    
    const emailExistente = await verificarEmail(email);
    if (emailExistente.length === 0) {    
        return res.status(400).send("Email não cadastrado.");
    }

    req.session.emailVerificacao = email; 

        try {
        await enviarEmailRecuperacaoSenha(email, "Código de Verificação", `Seu código de verificação é: ${codigo}`);
        await armazenarCodigoVerificacao(email, codigo, expiracao);
        res.send ("Código de verificação enviado com sucesso.");
    } catch (error) {
        console.error("Erro ao enviar o código de verificação:", error);
        throw new Error("Erro ao enviar o código de verificação.");
    }
}
   
export async function verificarCodigo(req, res) {
    const {email, codigo} = req.body;

    try {
        const resultado = await validarCodigoVerificacao(email, codigo);

        if (resultado.length > 0) {
            res.send("Código de verificação válido.");
        } else {
            res.status(400).send("Código de verificação inválido ou expirado.");
        }
    } catch (error) {
        console.error("Erro ao verificar o código:", error.message);
        res.status(500).send("Erro ao verificar o código.");
    }
}