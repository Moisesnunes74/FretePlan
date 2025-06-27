import express from "express";
import {cadastrarUsuario} from "../Controllers/usuarioController.js";

const router = express.Router();

router.post("/cadastro", cadastrarUsuario);


export default router;
