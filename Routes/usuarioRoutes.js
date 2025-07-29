import express from "express";
import {cadastrarUsuario} from "../Controllers/usuarioController.js";
import {loginUsuario} from "../Controllers/usuarioController.js";
import {enviarCodigoVerificacao, verificarCodigo} from "../Controllers/emailController.js";
import {alterarEmailUsuario} from "../Controllers/usuarioController.js";


const router = express.Router();

router.post("/cadastro", cadastrarUsuario);
router.post("/login", loginUsuario);
router.post("/enviarCodigo", enviarCodigoVerificacao)
router.post("/verificarCodigo", verificarCodigo);
router.put("/alterarSenha", alterarEmailUsuario);




export default router;
