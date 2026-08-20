import { Request, Response } from "express";
import * as feedbacksService from "../services/feedbacksService";

export async function criarFeedback(req: Request, res: Response) {
    try {
        const id = res.locals.usuarioLogado.id;
        const { feedback } = req.body;
        const feedBackCriado = await feedbacksService.criarFeedback(id, feedback);
        return res.status(201).json({ msg: "Feedback criado com sucesso!", feedBackCriado })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "ocorreu um erro no servidor" })
    }
}

export async function buscarFeedback(req: Request, res: Response) {
    try {
        const id = res.locals.usuarioLogado.id;
        const meusFeedbacks = await feedbacksService.buscarFeedback(id);
        return res.status(200).json({ meusFeedbacks })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "ocorreu um erro no servidor!", error })
    }

}