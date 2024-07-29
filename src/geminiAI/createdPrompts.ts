import { PROMPT_IDS, PROMPT_SCHEMAS } from "./prompts";

export const PROMPT_BUILDER = {
  [PROMPT_IDS.DICTIONARY]: ({
    languagesToLearn = `[{es: "Spanish"}, {hi: "Hindi"}]`,
    languagesAlreadyKnown = `[{en: "English"}]`,
    wordToLookUp = "fire",
  }) => {
    return `
CONTEXT: 
This prompt is used to show an AI based dictionary to the user. It is used inside a language learning website. 
The user has selected the below languages to learn
${languagesToLearn}

The user already knows the below languages
${languagesAlreadyKnown}

Output should contain array of responses of each of the languages, the user knows
and the ones which user wants to learn.

The user wants to find the dictionary details of the word 
"${wordToLookUp}"

partOfSpeech can be below in the JSON response
${PROMPT_SCHEMAS[PROMPT_IDS.TYPE_OF_SPEECH].example1.partOfSpeechCamelCase}

wordForms can be below in the JSON response
${PROMPT_SCHEMAS[PROMPT_IDS.WORD_FORMS].example1.wordFormsCamelCase}

EXAMPLE OUTPUT FORMAT RESPONSE STRUCTURE - but response should be for the word "${wordToLookUp}"
${PROMPT_SCHEMAS[PROMPT_IDS.DICTIONARY].example1}
        `;
  },
};
