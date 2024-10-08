import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { STRINGS } from "../utilities/constants";
import store from "../store/store";
import { PROMPTS } from "./prompts";

// Access your API key as an environment variable (see "Set up your API key" above)
export const GenAI = (apiKey) => {
  const USER_DEFINED_API_KEY = store.getState().language.apiKey;
  return new GoogleGenerativeAI(
    apiKey ||
      USER_DEFINED_API_KEY ||
      import.meta.env.VITE_REACT_APP_GEMINI_API_KEY
  );
};

// Define your models here (you can find them in the "Supported models" section of the API documentation)
const MODELS = STRINGS.MODELS;

const GetSafetySettings = () => {
  // TODO: If students or kids then filter it more - add that logic
  return [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];
};

const GetGenerationConfig = () => {
  return {
    temperature: 1.1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    // stopSequences: ["red"],
  };
};

// The Gemini 1.5 models are versatile and work with most use cases
export const GetModel = (model) => {
  const USER_SELECTED_AI_MODEL = store.getState().language?.geminiModel?.value;
  return GenAI().getGenerativeModel({
    model: model || USER_SELECTED_AI_MODEL || MODELS.FLASH_1_5.value,
    safetySettings: GetSafetySettings(),
  });
};

const ConvertGeminiResponseToText = (result) => {
  const response = await result.response;
  const text = response.text();
  console.log(text);
  // TODO: Store in firebase object
  // TODO: safetySettings - https://ai.google.dev/docs/safety_setting
  return text ?? "No response";
};
// const ConvertGeminiStreamResponseToText = (result) => {
//   let text = "";
//   for await (const chunk of result.stream) {
//     const chunkText = chunk.text();
//     console.log(chunkText);
//     text += chunkText;
//   }
//   // TODO: Store in firebase object
//   // TODO: safetySettings - https://ai.google.dev/docs/safety_setting
//   return text ?? "No response";
// };

export const PromptBuilder = ({ promptID }): string => {
  // PROMPTS[promptID];
  const model = GetModel();
  const prompt = "Write a story about a magic backpack.";

  // For text-only input
  const { totalTokens } = await model.countTokens(prompt);

  return {
    response: ConvertGeminiResponseToText(await model.generateContent(prompt)),
    totalTokens,
  };
};

export const GeminiChat = ({
  history = [
    {
      role: "user",
      parts: [{ text: "Hello, I have 2 dogs in my house." }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ],
  msg = "How many paws are in my house?",
  generationConfig = GetGenerationConfig(),
}) => {
  // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
  const model = GetModel();
  const chat = model.startChat({
    history,
    generationConfig,
  });

  // Build the query
  // User goals
  // User courses and lessons data
  // Some training data
  // Output format schema

  // For multi-turn conversations (like chat)
  const history = await chat.getHistory();
  const msgContent = { role: "user", parts: [{ text: msg }] };
  const contents = [...history, msgContent];
  const { totalTokens } = await model.countTokens({ contents });

  return {
    response: ConvertGeminiResponseToText(await chat.sendMessage(msg)),
    totalTokens,
  };
};
