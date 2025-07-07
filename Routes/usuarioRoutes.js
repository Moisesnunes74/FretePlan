import express from "express";
import {cadastrarUsuario} from "../Controllers/usuarioController.js";
import {loginUsuario} from "../Controllers/usuarioController.js";

const router = express.Router();

router.post("/cadastro", cadastrarUsuario);
router.post("/login", loginUsuario);


export default router;
