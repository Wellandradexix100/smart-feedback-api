import { prisma } from '../../lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function login(usuario: string, senha: string) {
    const usuarioExiste = await prisma.user.findUnique({
        where: {
            userName: usuario
        }
    })

    if (!usuarioExiste) {
        throw new Error("Login ou senha incorretos")
    }

    const compararSenha = bcrypt.compareSync(senha, usuarioExiste.password)
    if (!compararSenha) {
        throw new Error("Login ou senha incorretos")
    }

    const payload = {
        id: usuarioExiste.id,
        nome: usuarioExiste.name
    }
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw new Error("JWT_SECRET não configurado");
    }

    const token = jwt.sign(payload, secretKey, { expiresIn: '1d' })
    return token
}