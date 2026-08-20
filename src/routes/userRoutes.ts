import { Router } from "express";
import { criarUsuario, buscarUsuario } from "../controllers/userController";
import { autenticarToken } from "../middlewares/authMiddleware";
import { validarSchema } from "../middlewares/validarSchema";
import { criarUsuarioSchema } from "../schemas/usuarioSchemas";
const router = Router();

router.post("/", validarSchema(criarUsuarioSchema), criarUsuario);
router.get("/:id", autenticarToken, buscarUsuario);
export default router;