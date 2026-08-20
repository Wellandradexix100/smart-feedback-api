import { Router } from "express";
import { login } from "../controllers/authController";
import { validarSchema } from "../middlewares/validarSchema";
import { loginUsuarioSchema } from "../schemas/usuarioSchemas";
const auth = Router()

auth.post("/login", validarSchema(loginUsuarioSchema), login)

export default auth