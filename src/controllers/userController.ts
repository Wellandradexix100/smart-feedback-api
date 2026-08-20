import { Request, Response } from "express";
import * as userService from "../services/userService";



export async function criarUsuario(req: Request, res: Response) {
    try {
        const { name, username, password } = req.body;
        const usuarioCriado = await userService.criarUsuario(name, username, password);
        return res.status(201).json({ usuarioCriado });
    } catch (error) {
        return res.status(500).json({ msg: "Erro no servidor", error });
    }
}

export async function buscarUsuario(req: Request, res: Response) {
    try {
        const usuarioLogado = res.locals.usuarioLogado;
        const idString = req.params.id;
        const id = Number(idString);

        const buscar = await userService.buscarUsuario(id);
        return res.status(200).json({ msg: "usuario encontrado", buscar });
    } catch (error: any) {
        if (error.message === "Usuario não encontrado") {
            return res.status(404).json({ msg: error.message });
        }
        return res.status(500).json({ msg: "Erro no servidor", error });
    }
}
