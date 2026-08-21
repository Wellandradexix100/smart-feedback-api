import { prisma } from "../../lib/prisma"
import { GoogleGenAI } from "@google/genai";

export async function criarFeedback(id: number, feedback: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    const ai = new GoogleGenAI({ apiKey });

    const resposta = await ai.interactions.create({
        model: "gemini-3.5-flash",
        input: `Gemini, de acordo com essa resposta do cliente ${feedback} identifique qual a categoria do assunto e qual o humor da resposta, vocÊ precisa categorizar obrigatoriamente o humor entre POSITIVO, NEGATIVO, NEUTRO e o assunto sobre PRODUTO, ATENDIMENTO, BUG OU SUGESTÃO e um rascunhoResposta estremamente educado e profissional retorne em formato de json {assunto:, humor:, rascunhoResposta:}`,
    })

    function extrairJson(resposta: string) {
        try {
            const jsonMatch = resposta.match(/```json\s*([\s\S]*?)\s*```/)
            if (jsonMatch && jsonMatch[1]) {
                const objetoValido = JSON.parse(jsonMatch[1].trim());
                return objetoValido;
            }

            return JSON.parse(resposta.trim());
        } catch (error) {
            console.log("erro ao extrair o json", error)
            return null
        }
    }

    const respostaTratada = extrairJson(resposta.output_text!)

    const feedBackCriado = await prisma.feedBack.create({
        data: {
            userId: id,
            response: feedback,
            resposta: respostaTratada.rascunhoResposta,
            sentimento: respostaTratada.humor,
            categoria: respostaTratada.assunto
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
            response: true,
            sentimento: true,
            categoria: true
        }
    })



    return meusFeedbacks
}