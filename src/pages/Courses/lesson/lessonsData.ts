const Chapters = {
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
