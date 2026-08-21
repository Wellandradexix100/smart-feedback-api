import { Request, Response } from "express";
import * as feedbacksService from "../services/feedbacksService";

export async function criarFeedback(req: Request, res: Response) {
    try {
        const id = res.locals.usuarioLogado.id;
        const { feedback } = req.body;
        if (feedback && feedback.length > 2000) {
            return res.status(400).json({ error: "O texto do feedback é longo demais." });
        }
        const feedBackCriado = await feedbacksService.criarFeedback(id, feedback);
        return res.status(201).json({ msg: "Feedback criado com sucesso!", feedBackCriado })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "ocorreu um erro no servidor" })
    }
}

export async function buscarFeedbacks(req: Request, res: Response) {
    try {
        const id = res.locals.usuarioLogado.id;
        const humor = req.query.humor as string;
        const categoria = req.query.categoria as string;
        const meusFeedbacks = await feedbacksService.buscarFeedbacks(id, humor, categoria);
        return res.status(200).json({ meusFeedbacks })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "ocorreu um erro no servidor!", error })
    }

}

export async function buscarFeedback(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id as string)
        const usuarioLogado = res.locals.usuarioLogado.id;
        const feedbackEncontrado = await feedbacksService.buscarFeedback(id, usuarioLogado)
        if (!feedbackEncontrado) {
            return res.status(404).json({ msg: "Feedback não encontrado" })
        }
        return res.status(200).json({ msg: "Feedback encontrado:", feedbackEncontrado })
    } catch (error) {

        return res.status(500).json({ msg: "Ocorreu um erro no servidor!", error })
    }
}

export async function deletarFeedback(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id as string)
        const usuarioLogado = res.locals.usuarioLogado.id;
        const deletarFeedback = await feedbacksService.deletarFeedback(id, usuarioLogado)
        return res.status(200).json({ msg: "Feedback deletado!", deletarFeedback })
    } catch (error) {
        return res.status(500).json({ msg: "Ocorreu um erro no servidor!", error })
    }
}