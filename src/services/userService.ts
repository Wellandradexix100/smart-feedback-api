import { prisma } from "../../lib/prisma"
import bcrypt from 'bcrypt'

export async function criarUsuario(name: string, username: string, passwordString: string) {

    const passwordHashed = await bcrypt.hash(passwordString, 10);
    const createUser = await prisma.user.create({
        data: {
            name: name,
            userName: username,
            password: passwordHashed
        },
        select: {
            id: true,
            name: true,
            userName: true
        }
    })

    return createUser
}

export async function buscarUsuario(id: number) {
    const buscar = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            userName: true
        }
    })

    if (!buscar) {
        throw new Error("Usuario não encontrado")
    }

    return buscar
}