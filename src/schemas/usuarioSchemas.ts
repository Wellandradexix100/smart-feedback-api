import { z } from 'zod';

export const criarUsuarioSchema = z.object({
    name: z.string().min(3),
    username: z.string().min(3),
    password: z.string().min(6)
});

export const loginUsuarioSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6)
});
