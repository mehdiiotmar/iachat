import fs from 'fs';
import { prompt } from "./prompts/customer-support.ts"; // Ton prompt adapté

// Charger les données du fichier JSON
const supportData = JSON.parse(fs.readFileSync('supportData.json', 'utf-8'));

// Fonction pour trouver la réponse dans le JSON
function getAnswer(userQuestion: string): string {
  // Cherche une question correspondante dans le JSON
  const found = supportData.questions.find(q =>
    userQuestion.toLowerCase().includes(q.question.toLowerCase())
  );

  // Si trouvé, renvoyer la réponse
  return found ? found.answer : "Désolé, je n'ai pas trouvé de réponse à votre question. Voulez-vous contacter notre support ?";
}

// Exporte la configuration de l'application
export const appConfig: AppConfig = {
  OPENAI_API_KEY: Netlify.env.get("OPENAI_API_KEY") ?? "",
  historyLength: 8,
  maxMessageLength: 1000,
  apiConfig: {
    model: "gpt-3.5-turbo-1106",
  },
  systemPrompt: (_req, context) => {
    // Personnaliser la réponse du bot en fonction des données du JSON sans localisation ni date
    return `${prompt}
Répondez en fonction des informations suivantes : ${getAnswer(context.userQuestion)}`;
  },
};
