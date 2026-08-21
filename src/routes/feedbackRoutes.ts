import { Router } from "express";
import { criarFeedback, buscarFeedbacks, buscarFeedback, deletarFeedback } from "../controllers/feedbackController";
import { autenticarToken } from "../middlewares/authMiddleware";
import { criarFeedbackSchema } from "../schemas/usuarioSchemas";
import { validarSchema } from "../middlewares/validarSchema";
const feedBack = Router();

feedBack.post("/", autenticarToken, validarSchema(criarFeedbackSchema), criarFeedback);
feedBack.get("/", autenticarToken, buscarFeedbacks);
feedBack.get("/:id", autenticarToken, buscarFeedback);
feedBack.delete("/:id", autenticarToken, deletarFeedback);

export default feedBack;