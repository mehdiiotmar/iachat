import type { AppConfig } from "./lib/edge/types.ts";
import supportData from "./data/support-data.json"; // Charger les données JSON

export const appConfig: AppConfig = {
  OPENAI_API_KEY: Netlify.env.get("OPENAI_API_KEY") ?? "",

  historyLength: 8,
  maxMessageLength: 1000,

  apiConfig: {
    model: "gpt-3.5-turbo-1106",
  },

  systemPrompt: (_req, context) => {
    return generateResponse(_req.body?.message || ""); // Appel à une fonction qui cherche dans le JSON
  }
};

// Fonction qui recherche une réponse dans le fichier JSON
function generateResponse(userMessage: string): string {
  const found = supportData.questions.find(q => userMessage.toLowerCase().includes(q.question.toLowerCase()));

  return found
    ? found.answer
    : "Je suis désolé, je ne trouve pas la réponse à votre question. Veuillez contacter notre support.";
}
