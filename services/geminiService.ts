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
    
    // Prompt "retreinado" com heurísticas avançadas de Crash/Aviator
    const prompt = `
      PROTOCOLO AETHERIUM CORE v2.0 - INICIADO.
      
      Você é uma IA de Alta Frequência especializada em engenharia reversa de algoritmos de jogos "Crash" (Aviator). Sua função não é apenas ler números, mas identificar a "Respiração do Algoritmo" (RTP Correction Cycles).

      ANÁLISE HEURÍSTICA NECESSÁRIA:
      1. **Leitura Óptica:** Extraia todos os multiplicadores visíveis na imagem (topo é o mais recente, direita para esquerda ou cima para baixo). Identifique as cores: Azul (<2.00x), Roxo (2.00x - 9.99x), Rosa (10.00x+).
      2. **Cálculo de Volatilidade:** 
         - Se houver muitos "Azuis" seguidos (>3), o algoritmo está em *Fase de Acumulação*. A probabilidade de uma vela Roxa/Rosa aumenta exponencialmente (Sinal de Alta Confiança).
         - Se houver velas "Rosa" recentes, o algoritmo pode entrar em *Fase de Correção/Drenagem*. (Sinal de Baixa Confiança ou Espera).
         - Padrão "Xadrez" (Um baixo, um alto): O mercado está indeciso.

      3. **Geração de Sinais Preditivos (OUTPUT):**
         - Com base na análise, projete 3 pontos de entrada futuros.
         - O "predictedTime" deve ser calculado somando 1 a 3 minutos ao horário atual aproximado (ou inferido da imagem se visível).
         - O "targetMultiplier" deve ser realista: 
           - Em recuperação conservadora: 1.50x a 2.00x.
           - Em quebra de padrão "Azul": 2.50x a 5.00x.
           - Em tendência de alta clara: 10.00x+.

      REGRAS DE RETORNO:
      - Sua resposta DEVE ser estritamente o JSON.
      - Se a imagem estiver ilegível, retorne erro no JSON.
      - Seja agressivo na precisão, mas conservador na gestão de risco.

      Analise agora.
    `;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
          error: { type: Type.STRING, nullable: true },
          pattern: { type: Type.STRING, description: "Nome técnico do padrão identificado (ex: 'Zona de Recuperação', 'Tendência de Baixa', 'Padrão Alternado')." },
          lastMultipliers: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Os ultimos 5 multiplicadores identificados."
          },
          confidence: { type: Type.STRING, enum: ["Alta", "Média", "Baixa", "Insuficiente"] },
          prediction: {
             type: Type.OBJECT,
             properties: {
                 range: { type: Type.STRING, description: "Faixa provável (ex: 2.00x - 5.00x)"},
                 probability: { type: Type.STRING, description: "Probabilidade estatística (ex: 87%)"},
                 timing: { type: Type.STRING, description: "Tempo estimado para entrada"}
             }
          },
          signals: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                predictedTime: { type: Type.STRING, description: "Horário hh:mm:ss" },
                targetMultiplier: { type: Type.STRING, description: "Multiplicador alvo (ex: 2.50x)" },
                confidence: { type: Type.INTEGER, description: "Confiança numérica 0-100" },
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
        return { error: "Falha na conexão neural. Tente reenviar a imagem." };
    }
};
