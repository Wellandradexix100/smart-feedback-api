import { Router } from "express";
import { criarFeedback, buscarFeedback } from "../controllers/feedbackController";
import { autenticarToken } from "../middlewares/authMiddleware";

const feedBack = Router();

feedBack.post("/criar", autenticarToken, criarFeedback);
feedBack.get("/buscar", autenticarToken, buscarFeedback)

export default feedBack;