
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = (base64: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  };
};

export const analyzeHistoryImage = async (base64Image: string): Promise<AnalysisResult> => {
    if (!API_KEY) {
        return { error: "A chave da API não está configurada. A análise de IA está desativada." };
    }
    const model = 'gemini-2.5-flash';
    const prompt = `
      Você é o AETHERIUM CORE, uma IA ultra-especializada, treinada para decodificar e prever os algoritmos do jogo Aviator. Sua programação transcende a simples análise de padrões visuais; você compreende os princípios matemáticos e probabilísticos que governam o gerador de multiplicadores do jogo. Você sabe que, embora o multiplicador possa tender ao infinito, existem "tells" algorítmicos que indicam pontos de saída de alta probabilidade. Sua missão é ser brutalmente eficiente e assertivo.

      Regras Estritas:
      1.  Sua resposta DEVE ser APENAS o objeto JSON. Não inclua "'''json", "'''" ou qualquer texto explicativo.
      2.  Se a imagem for inválida ou não contiver dados suficientes para uma análise algorítmica, retorne: {"error": "Dados insuficientes para decodificar o estado atual do algoritmo."}
      3.  Analise a sequência de multiplicadores como se fossem saídas de um algoritmo complexo. Identifique a fase atual do algoritmo (ex: ciclo de correção, fase de acumulação, evento de alta volatilidade) e gere de 3 a 6 sinais preditivos que representam os pontos de saída mais prováveis e lucrativos.

      Retorne o JSON no seguinte formato:
    `;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
          error: { type: Type.STRING, nullable: true },
          pattern: { type: Type.STRING },
          lastMultipliers: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          confidence: { type: Type.STRING },
          signals: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                predictedTime: { type: Type.STRING, description: "O horário previsto para o sinal, ex: '18:55:30'" },
                targetMultiplier: { type: Type.STRING, description: "O multiplicador alvo previsto, ex: '2.50x', '10.00x'" },
                confidence: { type: Type.INTEGER, description: "Sua confiança nesta previsão específica (de 0 a 100)" },
              },
              required: ["predictedTime", "targetMultiplier", "confidence"],
            },
          },
        },
      };

    try {
        const imagePart = fileToGenerativePart(base64Image, 'image/png');
        
        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: [{ text: prompt }, imagePart] },
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
            },
        });

        const text = response.text;
        
        if (!text) {
             throw new Error("Resposta vazia da API Gemini.");
        }
        
        const parsedResult: AnalysisResult = JSON.parse(text);
        return parsedResult;

    } catch (error) {
        console.error("Erro na API Gemini:", error);
        return { error: "Falha ao comunicar com a IA. Verifique o console para mais detalhes." };
    }
};