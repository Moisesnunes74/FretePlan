import { conectarEmail } from "../email.js";
import { armazenarCodigoVerificacao } from "../Models/emailModel.js";
import { validarCodigoVerificacao } from "../Models/emailModel.js";
import { verificarEmail } from "../Models/emailModel.js";

import session from "express-session";

export async function enviarEmail(email, assunto, mensagem) {
    const transporter = await conectarEmail();
    const mailOptions = {
        from: "freteplan@gmail.com",
        to: email,
        subject: assunto,
        text: mensagem
}
    await transporter.sendMail(mailOptions)
}

export async function enviarCodigoVerificacao(req, res) {

    const codigo = Math.floor(10000 + Math.random() * 90000) ; // Gera um código de 6 dígitos
    const expiracao = new Date(Date.now() + 5 * 60000); 
    const email = req.body.email;

    // Verifica se o email já foi verificado
    const emailExistente = await verificarEmail(email);
    if (emailExistente.length === 0) {    
        return res.status(400).send("Email não cadastrado.");
    }

    req.session.emailVerificacao = email; 

        try {
        await enviarEmail(email, "Código de Verificação", `Seu código de verificação é: ${codigo}`);
        await armazenarCodigoVerificacao(email, codigo, expiracao);
        res.send ("Código de verificação enviado com sucesso.");
    } catch (error) {
        console.error("Erro ao enviar o código de verificação:", error);
        throw new Error("Erro ao enviar o código de verificação.");
    }
}
   
export async function verificarCodigo(req, res) {
    const {codigo} = req.body;
    const email = req.session.emailVerificacao;
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