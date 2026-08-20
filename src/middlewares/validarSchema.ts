import { ZodObject, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validarSchema = (schema: ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    msg: "Erro de validação",
                    erros: error.format()
                });
            }

            return res.status(500).json({ msg: "Erro interno no servidor" });
        }
    };
};