import { response } from "express"
import { prisma } from "../../lib/prisma"

export async function criarFeedback(id: number, feedback: string) {

    const feedBackCriado = await prisma.feedBack.create({
        data: {
            userId: id,
            response: feedback
        }
    })
    if (!feedBackCriado) {
        throw new Error("erro ao criar feedback!")
    }
    return feedBackCriado

}

export async function buscarFeedback(id: number) {

    const meusFeedbacks = await prisma.feedBack.findMany({
        where: {
            userId: id
        },
        select: {
            id: true,
            response: true
        }
    })



    return meusFeedbacks
}