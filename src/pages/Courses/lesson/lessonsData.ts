export const Chapters = {
  SOUNDS_AND_PRONUNCIATION: {
    name: "Sounds & Pronunciation",
    id: "SOUNDS_AND_PRONUNCIATION",
    description: "Covering basic sounds and pronunciation",
  },
  BASIC_VOCABULARY: {
    name: "Basic Vocabulary",
    id: "BASIC_VOCABULARY",
    description: "Introducing essential vocabulary",
  },
  BASIC_GRAMMAR: {
    name: "Basic Grammar",
    id: "BASIC_GRAMMAR",
    description: "For fundamental grammar rules",
  },
  EVERYDAY_CONVERSATIONS: {
    name: "Everyday Conversations",
    id: "EVERYDAY_CONVERSATIONS",
    description: "For common daily conversations",
  },
  EXPANDING_VOCABULARY: {
    name: "Expanding Vocabulary",
    id: "EXPANDING_VOCABULARY",
    description: "To broaden your vocabulary",
  },
  INTERMEDIATE_GRAMMAR: {
    name: "Intermediate Grammar",
    id: "INTERMEDIATE_GRAMMAR",
    description: "Study more complex grammar",
  },
  BUILDING_FLUENCY: {
    name: "Building Fluency",
    id: "BUILDING_FLUENCY",
    description: "Aimed at improving fluency",
  },
  CULTURAL_UNDERSTANDING: {
    name: "Cultural Understanding",
    id: "CULTURAL_UNDERSTANDING",
    description: "About cultural insights",
  },
};

export const CHAPTERS = {
  SOUNDS_AND_PRONUNCIATION: Chapters["SOUNDS_AND_PRONUNCIATION"].id,
  BASIC_VOCABULARY: Chapters["BASIC_VOCABULARY"].id,
  BASIC_GRAMMAR: Chapters["BASIC_GRAMMAR"].id,
  EVERYDAY_CONVERSATIONS: Chapters["EVERYDAY_CONVERSATIONS"].id,
  EXPANDING_VOCABULARY: Chapters["EXPANDING_VOCABULARY"].id,
  INTERMEDIATE_GRAMMAR: Chapters["INTERMEDIATE_GRAMMAR"].id,
  BUILDING_FLUENCY: Chapters["BUILDING_FLUENCY"].id,
  CULTURAL_UNDERSTANDING: Chapters["CULTURAL_UNDERSTANDING"].id,
};

export const ChaptersMotivation = [
  {
    icon: "📚",
    description: "Generate a lesson on Covering basic sounds and pronunciation",
    label: CHAPTERS.SOUNDS_AND_PRONUNCIATION,
  },
  {
    icon: "📚",
    description: "Generate a lesson on Introducing essential vocabulary",
    label: CHAPTERS.BASIC_VOCABULARY,
  },
  {
    icon: "📚",
    description: "Generate a lesson on For fundamental grammar rules",
    label: CHAPTERS.BASIC_GRAMMAR,
  },
  {
    icon: "📚",
    description: "Generate a lesson on For common daily conversations",
    label: CHAPTERS.EVERYDAY_CONVERSATIONS,
  },
  {
    icon: "📚",
    description: "Generate a lesson on To broaden your vocabulary",
    label: CHAPTERS.EXPANDING_VOCABULARY,
  },
  {
    icon: "📚",
    description: "Generate a lesson on Study more complex grammar",
    label: CHAPTERS.INTERMEDIATE_GRAMMAR,
  },
  {
    icon: "📚",
    description: "Generate a lesson on Aimed at improving fluency",
    label: CHAPTERS.BUILDING_FLUENCY,
  },
  {
    icon: "📚",
    description: "Generate a lesson on About cultural insights",
    label: CHAPTERS.CULTURAL_UNDERSTANDING,
  },
];

export const ChaptersSuggestedActions = {
  [Chapters.SOUNDS_AND_PRONUNCIATION.id]: [
    {
      label: "Understanding how sounds are produced",
      icon: "📚",
      prompt: "Generate a lesson on Phonetics",
    },
    {
      label: "Differentiating between similar sounds",
      icon: "📚",
      prompt: "Generate a lesson on Listening Practice",
    },
    {
      label: "Recognizing word and sentence emphasis",
      icon: "📚",
      prompt: "Generate a lesson on Intonation & Stress",
    },
    {
      label: "Mimicking native speakers and recording yourself",
      icon: "📚",
      prompt: "Generate a lesson on Speaking Practice",
    },
    {
      label: "Differentiating between short and long vowels",
      icon: "📚",
      prompt: "Generate a lesson on Vowel Sounds",
    },
    {
      label: "Practicing difficult consonant combinations",
      icon: "📚",
      prompt: "Generate a lesson on Consonant Clusters",
    },
    {
      label: "Identifying and practicing words that differ by only one sound",
      icon: "📚",
      prompt: "Generate a lesson on Minimal Pairs",
    },
    {
      label: "Understanding how words blend together in natural speech",
      icon: "📚",
      prompt: "Generate a lesson on Connected Speech",
    },
  ],
  [Chapters.BASIC_VOCABULARY.id]: [
    {
      label: "Learning common phrases for everyday interactions",
      icon: "📚",
      prompt: "Generate a lesson on Greetings & Introductions",
    },
    {
      label: "Building blocks for basic communication",
      icon: "📚",
      prompt: "Generate a lesson on Numbers, Days, Time",
    },
    {
      label: "Describing everyday objects and actions",
      icon: "📚",
      prompt: "Generate a lesson on Essential Nouns & Verbs",
    },
    {
      label: "Adding basic descriptions",
      icon: "📚",
      prompt: "Generate a lesson on Simple Adjectives & Adverbs",
    },
    {
      label: "Effective memorization techniques",
      icon: "📚",
      prompt: "Generate a lesson on Using Flashcards & Spaced Repetition",
    },
    {
      label: "Describing objects using basic colors and shapes",
      icon: "📚",
      prompt: "Generate a lesson on Colors & Shapes",
    },
    {
      label: "Talking about family members and relationships",
      icon: "📚",
      prompt: "Generate a lesson on Family & Relationships",
    },
    {
      label: "Discussing different weather conditions and seasons",
      icon: "📚",
      prompt: "Generate a lesson on Weather & Seasons",
    },
    {
      label: "Learning frequently used idiomatic expressions",
      icon: "📚",
      prompt: "Generate a lesson on Common Idioms",
    },
  ],
  [Chapters.BASIC_GRAMMAR.id]: [
    {
      label: "Understanding subject-verb-object order and variations",
      icon: "📚",
      prompt: "Generate a lesson on Sentence Structure",
    },
    {
      label: "Talking about current actions and situations",
      icon: "📚",
      prompt: "Generate a lesson on Present Tense",
    },
    {
      label: "Mastering present tense forms for common verbs",
      icon: "📚",
      prompt: "Generate a lesson on Basic Verb Conjugation",
    },
    {
      label: "Applying grammar rules for nouns and adjectives",
      icon: "📚",
      prompt: "Generate a lesson on Gender & Number Agreement",
    },
    {
      label: "Using question words (who, what, where, etc.)",
      icon: "📚",
      prompt: "Generate a lesson on Asking Simple Questions",
    },
    {
      label: "Using 'a', 'an', and 'the' correctly",
      icon: "📚",
      prompt: "Generate a lesson on Articles",
    },
    {
      label: "Describing locations using prepositions",
      icon: "📚",
      prompt: "Generate a lesson on Prepositions of Place",
    },
    {
      label: "Showing ownership with possessive nouns and pronouns",
      icon: "📚",
      prompt: "Generate a lesson on Possessive Forms",
    },
    {
      label: "Giving commands and making requests",
      icon: "📚",
      prompt: "Generate a lesson on Imperatives",
    },
  ],
  [Chapters.EVERYDAY_CONVERSATIONS.id]: [
    {
      label: "Common Phrases & Expressions",
      icon: "📚",
      prompt:
        "Generate a lesson on navigating everyday situations (shopping, dining, etc.)",
    },
    {
      label: "Asking for Directions & Help",
      icon: "📚",
      prompt:
        "Generate a lesson on finding your way around and seeking assistance",
    },
    {
      label: "Talking about Yourself & Interests",
      icon: "📚",
      prompt:
        "Generate a lesson on sharing personal information and engaging in small talk",
    },
    {
      label: "Simple Storytelling",
      icon: "📚",
      prompt:
        "Generate a lesson on describing past experiences in a basic manner",
    },
    {
      label: "Role-playing & Language Exchange",
      icon: "📚",
      prompt: "Generate a lesson on practicing real-life scenarios",
    },
    {
      label: "Making Appointments",
      icon: "📚",
      prompt: "Generate a lesson on scheduling meetings and appointments",
    },
    {
      label: "Ordering Food",
      icon: "📚",
      prompt:
        "Generate a lesson on navigating restaurant menus and ordering food",
    },
    {
      label: "Shopping for Clothes",
      icon: "📚",
      prompt: "Generate a lesson on conversing while shopping for clothing",
    },
    {
      label: "Expressing Preferences",
      icon: "📚",
      prompt: "Generate a lesson on talking about likes and dislikes",
    },
  ],
  [Chapters.EXPANDING_VOCABULARY.id]: [
    {
      label: "Thematic Word Lists",
      icon: "📚",
      prompt:
        "Generate a lesson on learning vocabulary related to specific topics (hobbies, travel, etc.)",
    },
    {
      label: "Using a Dictionary & Thesaurus",
      icon: "📚",
      prompt: "Generate a lesson on expanding vocabulary and finding synonyms",
    },
    {
      label: "Learning Root Words, Prefixes, Suffixes",
      icon: "📚",
      prompt:
        "Generate a lesson on deciphering word meanings and building vocabulary efficiently",
    },
    {
      label: "Reading Authentic Materials",
      icon: "📚",
      prompt:
        "Generate a lesson on exposing yourself to the language in context",
    },
    {
      label: "Synonyms & Antonyms",
      icon: "📚",
      prompt:
        "Generate a lesson on learning words with similar and opposite meanings",
    },
    {
      label: "Phrasal Verbs",
      icon: "📚",
      prompt:
        "Generate a lesson on understanding and using common phrasal verbs",
    },
    {
      label: "Collocations",
      icon: "📚",
      prompt: "Generate a lesson on learning words that commonly go together",
    },
    {
      label: "Proverbs & Sayings",
      icon: "📚",
      prompt: "Generate a lesson on understanding and using common proverbs",
    },
  ],
  [Chapters.INTERMEDIATE_GRAMMAR.id]: [
    {
      label: "Past Tense",
      icon: "📚",
      prompt: "Generate a lesson on talking about past events and experiences",
    },
    {
      label: "Future Tense",
      icon: "📚",
      prompt: "Generate a lesson on discussing future plans and possibilities",
    },
    {
      label: "Basic Conditional Sentences",
      icon: "📚",
      prompt: "Generate a lesson on expressing hypothetical situations",
    },
    {
      label: "Modal Verbs",
      icon: "📚",
      prompt:
        "Generate a lesson on understanding concepts like possibility, permission, and obligation",
    },
    {
      label: "Using Language Learning Apps & Websites",
      icon: "📚",
      prompt:
        "Generate a lesson on supplementing your learning with interactive exercises",
    },
    {
      label: "Present Perfect Tense",
      icon: "📚",
      prompt:
        "Generate a lesson on talking about experiences and actions with relevance to the present",
    },
    {
      label: "Relative Clauses",
      icon: "📚",
      prompt: "Generate a lesson on adding extra information to sentences",
    },
    {
      label: "Reported Speech",
      icon: "📚",
      prompt: "Generate a lesson on reporting what someone else has said",
    },
    {
      label: "Passive Voice",
      icon: "📚",
      prompt:
        "Generate a lesson on focusing on the action rather than the subject",
    },
  ],
  [Chapters.BUILDING_FLUENCY.id]: [
    {
      label: "Shadowing & Speaking Practice",
      icon: "📚",
      prompt:
        "Generate a lesson on mimicking native speakers to improve pronunciation and fluency",
    },
    {
      label: "Joining Conversation Groups",
      icon: "📚",
      prompt:
        "Generate a lesson on interacting with other learners and native speakers",
    },
    {
      label: "Watching Movies & TV Shows",
      icon: "📚",
      prompt:
        "Generate a lesson on immersing yourself in the language and culture",
    },
    {
      label: "Listening to Music & Podcasts",
      icon: "📚",
      prompt: "Generate a lesson on training your ear and expanding vocabulary",
    },
    {
      label: "Debating & Discussing",
      icon: "📚",
      prompt: "Generate a lesson on engaging in debates and discussions",
    },
    {
      label: "Public Speaking",
      icon: "📚",
      prompt: "Generate a lesson on practicing speeches and presentations",
    },
    {
      label: "Writing Practice",
      icon: "📚",
      prompt:
        "Generate a lesson on improving writing skills through essays and stories",
    },
    {
      label: "Language Games",
      icon: "📚",
      prompt: "Generate a lesson on playing games to reinforce language skills",
    },
  ],
  [Chapters.CULTURAL_UNDERSTANDING.id]: [
    {
      label: "Customs & Etiquette",
      icon: "📚",
      prompt:
        "Generate a lesson on learning about social norms and appropriate behavior",
    },
    {
      label: "History & Traditions",
      icon: "📚",
      prompt:
        "Generate a lesson on gaining insights into the cultural background",
    },
    {
      label: "Food & Cuisine",
      icon: "📚",
      prompt:
        "Generate a lesson on exploring culinary traditions and specialties",
    },
    {
      label: "Literature & Arts",
      icon: "📚",
      prompt:
        "Generate a lesson on appreciating artistic expressions and cultural perspectives",
    },
    {
      label: "Travel & Immersion",
      icon: "📚",
      prompt: "Generate a lesson on experiencing the culture firsthand",
    },
    {
      label: "Festivals & Celebrations",
      icon: "📚",
      prompt:
        "Generate a lesson on learning about important cultural festivals",
    },
    {
      label: "Famous Landmarks",
      icon: "📚",
      prompt:
        "Generate a lesson on exploring significant landmarks and their histories",
    },
    {
      label: "Cultural Symbols",
      icon: "📚",
      prompt:
        "Generate a lesson on understanding symbols and their meanings in different cultures",
    },
    {
      label: "Social Issues",
      icon: "📚",
      prompt:
        "Generate a lesson on discussing contemporary social issues and their cultural impact",
    },
  ],
};

export const ChaptersData = {
  [Chapters.SOUNDS_AND_PRONUNCIATION.id]: {
    description: Chapters.SOUNDS_AND_PRONUNCIATION.description,
    chapterId: Chapters.SOUNDS_AND_PRONUNCIATION.id,
    chapterName: Chapters.SOUNDS_AND_PRONUNCIATION.name,
    chapters: [
      {
        description: "Understanding how sounds are produced",
        lesson: "Phonetics",
      },
      {
        description: "Differentiating between similar sounds",
        lesson: "Listening Practice",
      },
      {
        description: "Recognizing word and sentence emphasis",
        lesson: "Intonation & Stress",
      },
      {
        description: "Mimicking native speakers and recording yourself",
        lesson: "Speaking Practice",
      },
      {
        description: "Differentiating between short and long vowels",
        lesson: "Vowel Sounds",
      },
      {
        description: "Practicing difficult consonant combinations",
        lesson: "Consonant Clusters",
      },
      {
        description:
          "Identifying and practicing words that differ by only one sound",
        lesson: "Minimal Pairs",
      },
      {
        description: "Understanding how words blend together in natural speech",
        lesson: "Connected Speech",
      },
    ],
  },
  [Chapters.BASIC_VOCABULARY.id]: {
    description: Chapters.BASIC_VOCABULARY.description,
    chapterId: Chapters.BASIC_VOCABULARY.id,
    chapterName: Chapters.BASIC_VOCABULARY.name,
    chapters: [
      {
        description: "Learning common phrases for everyday interactions",
        lesson: "Greetings & Introductions",
      },
      {
        description: "Building blocks for basic communication",
        lesson: "Numbers, Days, Time",
      },
      {
        description: "Describing everyday objects and actions",
        lesson: "Essential Nouns & Verbs",
      },
      {
        description: "Adding basic descriptions",
        lesson: "Simple Adjectives & Adverbs",
      },
      {
        description: "Effective memorization techniques",
        lesson: "Using Flashcards & Spaced Repetition",
      },
      {
        description: "Describing objects using basic colors and shapes",
        lesson: "Colors & Shapes",
      },
      {
        description: "Talking about family members and relationships",
        lesson: "Family & Relationships",
      },
      {
        description: "Discussing different weather conditions and seasons",
        lesson: "Weather & Seasons",
      },
      {
        description: "Learning frequently used idiomatic expressions",
        lesson: "Common Idioms",
      },
    ],
  },
  [Chapters.BASIC_GRAMMAR.id]: {
    description: Chapters.BASIC_GRAMMAR.description,
    chapterId: Chapters.BASIC_GRAMMAR.id,
    chapterName: Chapters.BASIC_GRAMMAR.name,
    chapters: [
      {
        description: "Understanding subject-verb-object order and variations",
        lesson: "Sentence Structure",
      },
      {
        description: "Talking about current actions and situations",
        lesson: "Present Tense",
      },
      {
        description: "Mastering present tense forms for common verbs",
        lesson: "Basic Verb Conjugation",
      },
      {
        description: "Applying grammar rules for nouns and adjectives",
        lesson: "Gender & Number Agreement",
      },
      {
        description: "Using question words (who, what, where, etc.)",
        lesson: "Asking Simple Questions",
      },
      {
        description: "Using 'a', 'an', and 'the' correctly",
        lesson: "Articles",
      },
      {
        description: "Describing locations using prepositions",
        lesson: "Prepositions of Place",
      },
      {
        description: "Showing ownership with possessive nouns and pronouns",
        lesson: "Possessive Forms",
      },
      {
        description: "Giving commands and making requests",
        lesson: "Imperatives",
      },
    ],
  },
  [Chapters.EVERYDAY_CONVERSATIONS.id]: {
    description: Chapters.EVERYDAY_CONVERSATIONS.description,
    chapterId: Chapters.EVERYDAY_CONVERSATIONS.id,
    chapterName: Chapters.EVERYDAY_CONVERSATIONS.name,
    chapters: [
      {
        description: "Navigating everyday situations (shopping, dining, etc.)",
        lesson: "Common Phrases & Expressions",
      },
      {
        description: "Finding your way around and seeking assistance",
        lesson: "Asking for Directions & Help",
      },
      {
        description: "Sharing personal information and engaging in small talk",
        lesson: "Talking about Yourself & Interests",
      },
      {
        description: "Describing past experiences in a basic manner",
        lesson: "Simple Storytelling",
      },
      {
        description: "Practicing real-life scenarios",
        lesson: "Role-playing & Language Exchange",
      },
      {
        description: "Scheduling meetings and appointments",
        lesson: "Making Appointments",
      },
      {
        description: "Navigating restaurant menus and ordering food",
        lesson: "Ordering Food",
      },
      {
        description: "Conversing while shopping for clothing",
        lesson: "Shopping for Clothes",
      },
      {
        description: "Talking about likes and dislikes",
        lesson: "Expressing Preferences",
      },
    ],
  },
  [Chapters.EXPANDING_VOCABULARY.id]: {
    description: Chapters.EXPANDING_VOCABULARY.description,
    chapterId: Chapters.EXPANDING_VOCABULARY.id,
    chapterName: Chapters.EXPANDING_VOCABULARY.name,
    chapters: [
      {
        description:
          "Learning vocabulary related to specific topics (hobbies, travel, etc.)",
        lesson: "Thematic Word Lists",
      },
      {
        description: "Expanding vocabulary and finding synonyms",
        lesson: "Using a Dictionary & Thesaurus",
      },
      {
        description:
          "Deciphering word meanings and building vocabulary efficiently",
        lesson: "Learning Root Words, Prefixes, Suffixes",
      },
      {
        description: "Exposing yourself to the language in context",
        lesson: "Reading Authentic Materials",
      },
      {
        description: "Learning words with similar and opposite meanings",
        lesson: "Synonyms & Antonyms",
      },
      {
        description: "Understanding and using common phrasal verbs",
        lesson: "Phrasal Verbs",
      },
      {
        description: "Learning words that commonly go together",
        lesson: "Collocations",
      },
      {
        description: "Understanding and using common proverbs",
        lesson: "Proverbs & Sayings",
      },
    ],
  },
  [Chapters.INTERMEDIATE_GRAMMAR.id]: {
    description: Chapters.INTERMEDIATE_GRAMMAR.description,
    chapterId: Chapters.INTERMEDIATE_GRAMMAR.id,
    chapterName: Chapters.INTERMEDIATE_GRAMMAR.name,
    chapters: [
      {
        description: "Talking about past events and experiences",
        lesson: "Past Tense",
      },
      {
        description: "Discussing future plans and possibilities",
        lesson: "Future Tense",
      },
      {
        description: "Expressing hypothetical situations",
        lesson: "Basic Conditional Sentences",
      },
      {
        description:
          "Understanding concepts like possibility, permission, and obligation",
        lesson: "Modal Verbs",
      },
      {
        description: "Supplementing your learning with interactive exercises",
        lesson: "Using Language Learning Apps & Websites",
      },
      {
        description:
          "Talking about experiences and actions with relevance to the present",
        lesson: "Present Perfect Tense",
      },
      {
        description: "Adding extra information to sentences",
        lesson: "Relative Clauses",
      },
      {
        description: "Reporting what someone else has said",
        lesson: "Reported Speech",
      },
      {
        description: "Focusing on the action rather than the subject",
        lesson: "Passive Voice",
      },
    ],
  },
  [Chapters.BUILDING_FLUENCY.id]: {
    description: Chapters.BUILDING_FLUENCY.description,
    chapterId: Chapters.BUILDING_FLUENCY.id,
    chapterName: Chapters.BUILDING_FLUENCY.name,
    chapters: [
      {
        description:
          "Mimicking native speakers to improve pronunciation and fluency",
        lesson: "Shadowing & Speaking Practice",
      },
      {
        description: "Interacting with other learners and native speakers",
        lesson: "Joining Conversation Groups",
      },
      {
        description: "Immersing yourself in the language and culture",
        lesson: "Watching Movies & TV Shows",
      },
      {
        description: "Training your ear and expanding vocabulary",
        lesson: "Listening to Music & Podcasts",
      },
      {
        description: "Engaging in debates and discussions",
        lesson: "Debating & Discussing",
      },
      {
        description: "Practicing speeches and presentations",
        lesson: "Public Speaking",
      },
      {
        description: "Improving writing skills through essays and stories",
        lesson: "Writing Practice",
      },
      {
        description: "Playing games to reinforce language skills",
        lesson: "Language Games",
      },
    ],
  },
  [Chapters.CULTURAL_UNDERSTANDING.id]: {
    description: Chapters.CULTURAL_UNDERSTANDING.description,
    chapterId: Chapters.CULTURAL_UNDERSTANDING.id,
    chapterName: Chapters.CULTURAL_UNDERSTANDING.name,
    chapters: [
      {
        description: "Learning about social norms and appropriate behavior",
        lesson: "Customs & Etiquette",
      },
      {
        description: "Gaining insights into the cultural background",
        lesson: "History & Traditions",
      },
      {
        description: "Exploring culinary traditions and specialties",
        lesson: "Food & Cuisine",
      },
      {
        description:
          "Appreciating artistic expressions and cultural perspectives",
        lesson: "Literature & Arts",
      },
      {
        description: "Experiencing the culture firsthand",
        lesson: "Travel & Immersion",
      },
      {
        description: "Learning about important cultural festivals",
        lesson: "Festivals & Celebrations",
      },
      {
        description: "Exploring significant landmarks and their histories",
        lesson: "Famous Landmarks",
      },
      {
        description:
          "Understanding symbols and their meanings in different cultures",
        lesson: "Cultural Symbols",
      },
      {
        description:
          "Discussing contemporary social issues and their cultural impact",
        lesson: "Social Issues",
      },
    ],
  },
};
