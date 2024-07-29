export const DictionarySampleData =
  // Create a UI for this JSON response in React amd tailwind.
  // Create a JS function to combine the meanings in different object and the phonetics(using key of text) if they are same, if not then add to array, and sort the phonetics by text. Do the same for meanings and sort the meanings by partOfSpeech
  [
    {
      word: "battle",
      phonetic: "/ˈbætəl/",
      phonetics: [
        {
          text: "/ˈbætəl/",
          audio: "",
        },
        {
          text: "/ˈbætl̩/",
          audio:
            "https://api.dictionaryapi.dev/media/pronunciations/en/battle-us.mp3",
          sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=1229238",
          license: {
            name: "BY-SA 3.0",
            url: "https://creativecommons.org/licenses/by-sa/3.0",
          },
        },
      ],
      meanings: [
        {
          partOfSpeech: "noun",
          definitions: [
            {
              definition: "A contest, a struggle.",
              synonyms: [],
              antonyms: [],
              example: "the battle of life",
            },
            {
              definition:
                "A general action, fight, or encounter, in which all the divisions of an army are or may be engaged; a combat, an engagement.",
              synonyms: [],
              antonyms: [],
            },
            {
              definition: "A division of an army; a battalion.",
              synonyms: [],
              antonyms: [],
            },
            {
              definition:
                "The main body of an army, as distinct from the vanguard and rear; the battalia.",
              synonyms: [],
              antonyms: [],
            },
          ],
          synonyms: [],
          antonyms: [],
        },
        {
          partOfSpeech: "verb",
          definitions: [
            {
              definition: "To join in battle; to contend in fight",
              synonyms: [],
              antonyms: [],
              example: "Scientists always battle over theories.",
            },
            {
              definition: "To fight or struggle; to enter into a battle with.",
              synonyms: [],
              antonyms: [],
              example: "She has been battling cancer for years.",
            },
          ],
          synonyms: [],
          antonyms: [],
        },
      ],
      license: {
        name: "CC BY-SA 3.0",
        url: "https://creativecommons.org/licenses/by-sa/3.0",
      },
      sourceUrls: ["https://en.wiktionary.org/wiki/battle"],
    },
    {
      word: "battle",
      phonetic: "/ˈbætəl/",
      phonetics: [
        {
          text: "/ˈbætəl/",
          audio: "",
        },
        {
          text: "/ˈbætl̩/",
          audio:
            "https://api.dictionaryapi.dev/media/pronunciations/en/battle-us.mp3",
          sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=1229238",
          license: {
            name: "BY-SA 3.0",
            url: "https://creativecommons.org/licenses/by-sa/3.0",
          },
        },
      ],
      meanings: [
        {
          partOfSpeech: "verb",
          definitions: [
            {
              definition: "To nourish; feed.",
              synonyms: [],
              antonyms: [],
            },
            {
              definition: "To render (for example soil) fertile or fruitful",
              synonyms: [],
              antonyms: [],
            },
          ],
          synonyms: [],
          antonyms: [],
        },
        {
          partOfSpeech: "adjective",
          definitions: [
            {
              definition: "Improving; nutritious; fattening.",
              synonyms: [],
              antonyms: [],
              example: "battle grass, battle pasture",
            },
            {
              definition: "Fertile; fruitful.",
              synonyms: [],
              antonyms: [],
              example: "battle soil, battle land",
            },
          ],
          synonyms: [],
          antonyms: [],
        },
      ],
      license: {
        name: "CC BY-SA 3.0",
        url: "https://creativecommons.org/licenses/by-sa/3.0",
      },
      sourceUrls: ["https://en.wiktionary.org/wiki/battle"],
    },
  ];

export const SampleAIDictionaryData = {
  language: {
    code: "en",
    name: "English",
  },
  response: {
    word: "fire",
    baseAlphabetsPresentWithoutDiacritics: ["F", "I", "R", "E"],
    followUpSuggestedChatActions: [
      "Create a story using 'Fire'",
      "Create a poem about 'Fire'",
      "Create a short conversation using 'Fire'",
      "Explain the significance of 'Fire' in the story of Prometheus",
      "Describe what happens when we see 'Fire' in a dream",
    ],
    phonetics: ["/ˈfaɪər/"],
    usages: {
      sentences: {
        beginning: [
          "Fire roared in the fireplace, casting a warm glow on the room.",
          "Firefighters rushed to the scene of the blaze, battling the flames.",
        ],
        middle: [
          "The campers gathered around the campfire, sharing stories and laughter.",
          "The forest fire raged uncontrollably, threatening to consume everything in its path.",
        ],
        end: [
          "The fire crackled and popped, its warmth a welcome respite from the cold.",
          "The building was engulfed in flames, the fire spreading rapidly.",
        ],
      },
      word: {
        beginning: [
          "Firearm",
          "Firebrand",
          "Firefighter",
          "Fireplace",
          "Firewood",
        ],
        middle: ["Backfire", "Crossfire", "Firefly", "Skyfire"],
        end: ["Wildfire", "Gunfire", "Bonfire"],
      },
    },
    etymology:
      "Old English *fȳr, of Germanic origin; related to Dutch vuur and German Feuer.",
    idiomsAndPhrases: [
      "play with fire",
      "set something on fire",
      "add fuel to the fire",
      "under fire",
      "fire up",
    ],
    collocations: [
      "fire alarm",
      "fire escape",
      "fire engine",
      "fire hazard",
      "fire prevention",
      "fire safety",
    ],
    wordForms: {
      baseForm: "fire",
      pastTense: "",
      pastParticiple: "",
      presentParticiple: "",
      thirdPersonSingular: "",
      plural: "",
      comparative: "",
      superlative: "",
      gerund: "",
      infinitive: "",
    },
    thesaurus: {
      synonyms: ["blaze", "flame", "conflagration", "inferno", "combustion"],
      antonyms: ["water", "ice", "snow", "rain"],
    },
    frequency: "common",
    usageNotes:
      "Fire can be both destructive and beneficial, depending on the context.",
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: "The light and heat produced by something burning.",
            example: "The fire in the fireplace kept us warm.",
          },
          {
            definition:
              "A burning or glowing mass of material, especially one that is hot enough to emit light and heat.",
            example: "The forest fire raged for days.",
          },
          {
            definition: "The process of burning, or something that is burning.",
            example: "The fire is out of control.",
          },
          {
            definition: "A state of great excitement or emotion.",
            example:
              "He spoke with fire in his belly, passionate about his cause.",
          },
          {
            definition: "An act of shooting or firing a gun.",
            example: "The officer opened fire on the suspect.",
          },
        ],
        thesaurus: {
          synonyms: [
            "blaze",
            "flame",
            "conflagration",
            "inferno",
            "combustion",
            "burning",
            "ignition",
          ],
          antonyms: ["water", "ice", "snow", "rain", "extinction", "quenching"],
        },
      },
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "To ignite and burn.",
            example: "The candles were fired, filling the room with light.",
          },
          {
            definition: "To shoot a gun or other projectile weapon.",
            example: "He fired a shot into the air.",
          },
          {
            definition: "To dismiss someone from their job.",
            example: "She was fired from her job for poor performance.",
          },
        ],
        thesaurus: {
          synonyms: ["ignite", "burn", "shoot", "dismiss", "discharge"],
          antonyms: ["extinguish", "quench", "hire", "employ"],
        },
      },
    ],
  },
};
