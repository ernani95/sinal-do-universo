const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateInterpretation(readingData) {
  // Validate inputs
  if (!readingData || !readingData.cards_json) {
    throw new Error('Invalid reading data provided to AI services');
  }

  const prompt = `
    ATUE COMO: Um oráculo digital sábio, empático e profundo.
    
    TAREFA: Gerar uma interpretação de Tarot de 3 cartas (Passado/Momento, Bloqueio, Futuro/Solução) seguindo RIGOROSAMENTE a estrutura JSON abaixo.

    DADOS DO CONSULENTE:
    - Nome: ${readingData.user_name}
    - Pergunta: "${readingData.question}"
    - Cartas Sorteadas (IDs do Rider-Waite Major Arcana): 
      1. Momento Atual: Carta ${readingData.cards_json[0]}
      2. O Bloqueio: Carta ${readingData.cards_json[1]}
      3. A Solução: Carta ${readingData.cards_json[2]}

    ESTRUTURA PSICOLÓGICA (5 CAMADAS) - OBRIGATÓRIO SEGUIR O TOM:
    1. Validação: Acolha a dor da pergunta. Mostre empatia.
    2. Leitura Direta: Fale sobre o bloqueio revelado na carta 2.
    3. Carta a Carta: Interprete cada uma profundamente.
    4. Alerta Crítico: Um aviso urgente sobre a carta 2.
    5. Ação: Um conselho prático da carta 3.

    FORMATO DE RESPOSTA (JSON PURO):
    {
      "validation_text": "Texto acolhedor aqui...",
      "direct_reading": "Texto sobre o bloqueio...",
      "cards_analysis": [
        { "name": "Nome da Carta 1", "meaning": "Interpretação..." },
        { "name": "Nome da Carta 2", "meaning": "Interpretação..." },
        { "name": "Nome da Carta 3", "meaning": "Interpretação..." }
      ],
      "critical_alert": "ALERTA: Texto do aviso...",
      "actionable_advice": "Conselho prático aqui..."
    }

    IMPORTANTE: Responda APENAS o JSON. Sem blocos de código markdown.
    `;

  try {
    // Using gemini-flash-latest as an alternative to avoid 429 on 2.0
    const modelName = "gemini-flash-latest";
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean markdown if present
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();

    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw error;
  }
}

module.exports = { generateInterpretation };
