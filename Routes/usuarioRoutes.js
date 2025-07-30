import express from "express";
import {cadastrarUsuario} from "../Controllers/usuarioController.js";
import {loginUsuario} from "../Controllers/usuarioController.js";
import {verificarCodigoCadastro} from "../Controllers/emailController.js";
import {enviarCodigoRecuperacaoSenha, verificarCodigo} from "../Controllers/emailController.js";
import {alterarSenhaUsuario} from "../Controllers/usuarioController.js";


const router = express.Router();

//Cadastro e verificação de email
router.post("/cadastro", cadastrarUsuario);
router.post("verificarEmail", verificarCodigoCadastro);

//Login
router.post("/login", loginUsuario);

//Recuperação de senha
router.post("/enviarCodigoRecuperacao", enviarCodigoRecuperacaoSenha)
router.post("/verificarCodigo", verificarCodigo);
router.put("/alterarSenha", alterarSenhaUsuario);

export default router;
