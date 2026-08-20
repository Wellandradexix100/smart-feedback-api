import { Router } from "express";
import { criarFeedback, buscarFeedback } from "../controllers/feedbackController";
import { autenticarToken } from "../middlewares/authMiddleware";
import { criarFeedbackSchema } from "../schemas/usuarioSchemas";
import { validarSchema } from "../middlewares/validarSchema";
const feedBack = Router();

feedBack.post("/criar", autenticarToken, validarSchema(criarFeedbackSchema), criarFeedback);
feedBack.get("/buscar", autenticarToken, buscarFeedback)

export default feedBack;