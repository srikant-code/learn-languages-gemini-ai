export const PROMPT_IDS = {
  DICTIONARY: "DICTIONARY",
  REVERSE_DICTIONARY: "REVERSE_DICTIONARY",
  POEM_FOUR_WORDS: "POEM_FOUR_WORDS",
  TRAVELLING: "TRAVELLING",
  OFFICE: "OFFICE",
  TYPE_OF_SPEECH: "TYPE_OF_SPEECH",
  OUTPUT_LANGUAGE: "OUTPUT_LANGUAGE",
  WORD_FORMS: "WORD_FORMS",
  ALPHABETS: "ALPHABETS",
};

const STRING_TYPE = { type: "string" };
const TYPES = {
  ARRAY: (type = STRING_TYPE) => {
    return { type: "array", items: type };
  },
  STRING: STRING_TYPE,
};
export const JSON_PROMPT_RES_SCHEMAS = {
  [PROMPT_IDS.DICTIONARY]: {
    word: TYPES.STRING,
    definitions: {
      type: "object",
      properties: { partOfSpeech: "", meanings: TYPES.ARRAY() },
    },
    examples: {
      type: "object",
      properties: {
        beginning: TYPES.ARRAY(),
        middle: TYPES.ARRAY(),
        end: TYPES.ARRAY(),
      },
    },
  },
  [PROMPT_IDS.TYPE_OF_SPEECH]: {},
};

export const PROMPTS = {
  [PROMPT_IDS.DICTIONARY]: {
    title: "Dictionary",
    prompt: "Search for words, phrases, and definitions.",
    inputs: [{}],
  },
  [PROMPT_IDS.REVERSE_DICTIONARY]: {
    prompt: `Given a definition, return the word it defines.
      Definition: When you're happy that other people are also sad.
      Word: schadenfreude
      Definition: existing purely in the mind, but not in physical reality
      Word: abstract
      Definition: ${"USER_INPUT_HERE"}
      Word:`,
  },
  [PROMPT_IDS.POEM_FOUR_WORDS]: {
    prompt: `Write me a four-line poem about puppies and Android phones. Make sure it rhymes.`,
  },
  [PROMPT_IDS.TRAVELLING]: {
    prompt: `Generate a bulleted list of items I need to pack for a three-day camping trip.`,
  },
  [PROMPT_IDS.ALPHABETS]: {
    prompt: `Give me the list of all alphabets in Hindi, with details of usages/examples, meanings, partofspeech, and all the other information, for an AI based language learning app API. Give in JSON format`,
    prompt2: `What are the 20% of concepts that are used in 80% of the languages?`,
  },
  [PROMPT_IDS.OFFICE]: {
    prompt: `email, or letters, utilise the 
    {
      stopSequences: ["red"],
      maxOutputTokens: 200,
      temperature: 0.9,
      topP: 0.1,
      topK: 16,
    }
  topK topP stop_sequences, tempreature and output tokens,  
    "English:" and "French:", output prefix "JSON:"

    List 5 popular cookie recipes using this JSON schema:
    { "type": "object",
      "properties": {
        "recipe_name": { "type": "string" },
      }
    }
      
    Creative writing
    Describing or interpreting media assets
    Text completion
    Summarizing free-form text
    Translating between languages
    Chatbots
`,
  },
  [PROMPT_IDS.TYPE_OF_SPEECH]: {},
};

export const PROMPT_SCHEMAS = {
  [PROMPT_IDS.OUTPUT_LANGUAGE]: {
    language: {
      code: "en",
      name: "English",
    },
  },
  [PROMPT_IDS.TYPE_OF_SPEECH]: {
    example1: {
      partOfSpeechCamelCase: `[
        "noun",
        "verb",
        "adjective",
        "adverb",
        "pronoun",
        "preposition",
        "conjunction",
        "interjection",
        "article",
        "determiner",
      ]`,
      partOfSpeech: [
        {
          type: "noun",
          meaning: "A word that represents a person, place, thing, or idea.",
        },
        {
          type: "verb",
          meaning: "A word that represents an action or a state of being.",
        },
        {
          type: "adjective",
          meaning: "A word that describes or modifies a noun.",
        },
        {
          type: "adverb",
          meaning:
            "A word that modifies a verb, an adjective, or another adverb.",
        },
        { type: "pronoun", meaning: "A word that takes the place of a noun." },
        {
          type: "preposition",
          meaning:
            "A word that shows the relationship between a noun (or pronoun) and other words in a sentence.",
        },
        {
          type: "conjunction",
          meaning: "A word that connects words, phrases, or clauses.",
        },
        {
          type: "interjection",
          meaning:
            "A word or phrase that expresses strong emotion or surprise.",
        },
        {
          type: "article",
          meaning:
            "A word that defines a noun as specific or unspecific (e.g., 'the', 'a', 'an').",
        },
        {
          type: "determiner",
          meaning:
            "A word that introduces a noun and specifies it as known or unknown (e.g., 'this', 'that', 'my').",
        },
      ],
    },
  },
  [PROMPT_IDS.WORD_FORMS]: {
    example1: {
      wordFormsCamelCase: `[
        "baseForm",
        "pastTense",
        "pastParticiple",
        "presentParticiple",
        "thirdPersonSingular",
        "plural",
        "comparative",
        "superlative",
        "gerund",
        "infinitive",
      ]`,
      wordForms: [
        {
          form: "base form",
          meaning:
            "The original form of the word, without any inflections (e.g., 'run', 'eat').",
        },
        {
          form: "past tense",
          meaning:
            "The form of the verb used to indicate an action that happened in the past (e.g., 'ran', 'ate').",
        },
        {
          form: "past participle",
          meaning:
            "The form of the verb used in perfect tenses and passive voice (e.g., 'run' -> 'run', 'eat' -> 'eaten').",
        },
        {
          form: "present participle",
          meaning:
            "The form of the verb used in continuous tenses and as adjectives (e.g., 'running', 'eating').",
        },
        {
          form: "third person singular",
          meaning:
            "The form of the verb used with third person singular subjects in the present tense (e.g., 'runs', 'eats').",
        },
        {
          form: "plural",
          meaning:
            "The form of a noun used to indicate more than one (e.g., 'cats', 'children').",
        },
        {
          form: "comparative",
          meaning:
            "The form of an adjective or adverb used to compare two things (e.g., 'bigger', 'more quickly').",
        },
        {
          form: "superlative",
          meaning:
            "The form of an adjective or adverb used to indicate the highest degree (e.g., 'biggest', 'most quickly').",
        },
        {
          form: "gerund",
          meaning:
            "The -ing form of a verb used as a noun (e.g., 'running', 'eating').",
        },
        {
          form: "infinitive",
          meaning:
            "The base form of a verb, usually preceded by 'to' (e.g., 'to run', 'to eat').",
        },
      ],
    },
  },
  [PROMPT_IDS.DICTIONARY]: {
    example1: `[
      {
        language: { code: "en", name: "English" },
        response: {
          word: "battle",
          baseAlphabetsPresentWithoutDiacritics: ["B", "A", "T", "T", "L", "E"],
          followUpSuggestedChatActions: [
            "Create a story using 'Battle'",
            "Create a poem about 'Battle'",
            // more follow up relevant actions
          ],
          phonetics: ["/ˈbætəl/"],
          usages: {
            sentences: {
              beginning: [
                "Battle lines were drawn as the two armies prepared for war.",
                "Battle scars tell the story of a soldier's bravery.",
              ],
              middle: [
                "The hero fought bravely in the battle, never losing hope.",
                "She faced a tough battle against her illness.",
              ],
              end: [
                "They emerged victorious from the fierce battle.",
                "The battle raged on for hours.",
              ],
            },
            word: {
              beginning: ["Battleground", "Battlefield"],
              middle: ["Embattled", "Rebattle"],
              end: ["Gunfire", "Wildfire"], // fill details here
            },
          },
          etymology: "", // fill details here
          idiomsAndPhrases: [""], // fill details here
          collocations: [""], // fill details here
          wordForms: {
            // fill details here
            baseForm: "battle",
            pastTense: "battled",
            pastParticiple: "battling",
            presentParticiple: "battling",
            thirdPersonSingular: "battles",
            plural: "",
            comparative: "",
            superlative: "",
            gerund: "",
            infinitive: "",
          },
          thesaurus: {
            synonyms: [""], // fill details here
            antonyms: [""], // fill details here
          },
          frequency: "common",
          usageNotes: ["Often used to illustrate a fight."],
          meanings: [
            {
              partOfSpeech: "noun",
              definitions: [
                {
                  definition: "A contest, a struggle.",
                  example: "the battle of life",
                },
                {
                  definition:
                    "A general action, fight, or encounter, in which all the divisions of an army are or may be engaged; a combat, an engagement.",
                  example: "example here",
                },
                {
                  definition: "A division of an army; a battalion.",
                  example: "example here",
                },
                {
                  definition:
                    "The main body of an army, as distinct from the vanguard and rear; the battalia.",
                  example: "example here",
                },
              ],
              thesaurus: { synonyms: [], antonyms: [] },
            },
            {
              partOfSpeech: "verb",
              definitions: [
                {
                  definition: "To join in battle; to contend in fight",
                  example: "Scientists always battle over theories.",
                },
                {
                  definition:
                    "To fight or struggle; to enter into a battle with.",
                  example: "She has been battling cancer for years.",
                },
                {
                  definition: "To nourish; feed.",
                  example: "example here",
                },
                {
                  definition:
                    "To render (for example soil) fertile or fruitful",
                  example: "example here",
                },
              ],
              thesaurus: { synonyms: [], antonyms: [] },
            },
            {
              partOfSpeech: "adjective",
              definitions: [
                {
                  definition: "Improving; nutritious; fattening.",
                  example: "battle grass, battle pasture",
                },
                {
                  definition: "Fertile; fruitful.",
                  example: "battle soil, battle land",
                },
              ],
              thesaurus: { synonyms: [], antonyms: [] },
            },
            // more parts of speech from the given list (if available)
          ],
        },
      },
      // objects for other languages
    ]`,
  },
  "Basic phonetics and orthographic elements across languages": {
    vowels: ["A", "E", "I", "O", "U"],
    consonants: ["Z"],
    diacritics: [
      "´ (acute)",
      "ˋ (grave)",
      "ˆ (circumflex)",
      "˜ (tilde)",
      "¨ (diaeresis)",
      "ˇ (caron)",
      "˘ (breve)",
      "˙ (dot above)",
      "˚ (ring above)",
      "¸ (cedilla)",
      "˛ (ogonek)",
    ],
    diphthongs: ["ai", "au", "ei", "eu", "oi", "ou"],
    triphthongs: ["iau", "uai", "uei"],
    tones: ["high", "mid", "low", "rising", "falling"],
    stress: ["primary", "secondary"],
    nasalization: ["ã", "ẽ", "ĩ", "õ", "ũ"],
    length: ["short", "long"],
    voicing: ["voiced", "voiceless"],
    aspiration: ["aspirated", "unaspirated"],
    palatalization: ["palatalized", "non-palatalized"],
    glottalization: ["glottalized", "non-glottalized"],
  },
  "meaning of phonetics and orthographic elements": {
    vowels:
      "Sounds produced without any significant constriction or blockage of airflow in the vocal tract. Examples: A, E, I, O, U.",
    consonants:
      "Sounds produced with some degree of constriction or closure at one or more points along the vocal tract. Examples: B, C, D, F, G.",
    diacritics:
      "Marks added to letters to alter their pronunciation or to distinguish between similar words. Examples: é (acute), è (grave), ñ (tilde).",
    diphthongs:
      "Complex vowel sounds that begin with one vowel and glide into another within the same syllable. Examples: ai (as in 'aisle'), au (as in 'out').",
    triphthongs:
      "Complex vowel sounds that involve a glide from one vowel to another and then to a third within the same syllable. Examples: iau (as in 'iau' in Welsh), uai (as in 'uai' in Portuguese).",
    tones:
      "Pitch variations that can change the meaning of a word. Examples: high (as in Mandarin 'mā'), low (as in Mandarin 'mǎ').",
    stress:
      "Emphasis placed on certain syllables or words. Examples: primary (as in 'record' when used as a noun), secondary (as in 'record' when used as a verb).",
    nasalization:
      "Sounds produced with airflow through the nose. Examples: ã (as in 'pão' in Portuguese), õ (as in 'não' in Portuguese).",
    length:
      "Duration of vowel sounds. Examples: short (as in 'bit'), long (as in 'beat').",
    voicing:
      "Whether the vocal cords vibrate during the production of a sound. Examples: voiced (as in 'b'), voiceless (as in 'p').",
    aspiration:
      "A burst of air that follows the release of a consonant. Examples: aspirated (as in 'p' in 'pat'), unaspirated (as in 'p' in 'spat').",
    palatalization:
      "Sounds produced with the body of the tongue raised towards the hard palate. Examples: palatalized (as in 'ny' in 'canyon').",
    glottalization:
      "Sounds produced with a constriction or closure of the glottis. Examples: glottalized (as in 't' in 'button' in some dialects).",
  },
  [PROMPT_IDS.ALPHABETS]: {
    example1: {
      alphabet: "Latin alphabet",
      language: "Latin English",
      total: 26,
      characters: {
        A: {
          letter: "अ",
          phonetic: "",
          transliteration: {
            en: "a",
            es: "a",
          },
          type: "vowel",
          usages: {
            beginning: [
              { example: "अनार (Anaar)", meaning: "Pomegranate" },
              { example: "अच्छा (Acchā)", meaning: "Good" },
            ],
            middle: [{}],
            end: [{}],
          },
          usageNotes: "",
          etymology: "",
          idiomsAndPhrases: "",
          collocations: "",
          frequency: "",
          meanings: [],
        },
        B: {},
        C: {},
        D: {},
      },
      suggestedActions: [""],
    },
  },
};
