import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
    id: number;
    userName: string;
    iat: number;
    exp: number;
}

export function autenticarToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ msg: "Token não fornecido" });
    }

    const partes = authHeader.split(" ");

    if (partes.length !== 2) {
        return res.status(401).json({ msg: "Erro no formato do token" });
    }

    const [esquema, token] = partes;

    if (!/^Bearer$/i.test(esquema)) {
        return res.status(401).json({ msg: "Token mal formatado" });
    }

    const secretKey = process.env.JWT_SECRET || 'chave_de_emergencia_caso_nao_tenha_env';

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: "Token inválido ou expirado" });
        }

        const payload = decoded as TokenPayload;

        res.locals.usuarioLogado = {
            id: payload.id,
            userName: payload.userName
        };

        return next();
    });
}
