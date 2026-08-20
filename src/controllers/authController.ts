import { Request, Response } from "express";
import * as authService from "../services/authService";

export async function login(req: Request, res: Response) {
    try {
        const { usuario, senha } = req.body;
        const token = await authService.login(usuario, senha);
        return res.status(200).json({ msg: "Logado com sucesso", token });
    } catch (error: any) {
        if (error.message === "Login ou senha incorretos") {
            return res.status(401).json({ msg: error.message });
        }
        return res.status(500).json({ msg: "Ocorreu um erro interno", error: error.message });
    }
}
