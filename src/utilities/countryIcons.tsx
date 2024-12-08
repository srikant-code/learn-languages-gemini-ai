import { countryIcon } from "./countries";

const widthAndHeight = ""; // width="32" height="32"
export const Greetings = {
  en: "Hello",
  ak: "Akwaaba",
  ee: "Woezor",
  tw: "Akwaaba",
  ps: "سلام",
  hy: "Բարեւ",
  bs: "Zdravo",
  az: "Salam",
  bn: "নমস্কার",
  be: "Прывітанне",
  ay: "Kamisaki",
  dz: "ཁེ་བསལ་ལོ།",
  tn: "Dumela",
  bg: "Здравейте",
  rn: "Amakuru",
  km: "ជំរាបសួរ",
  cr: "Tansi",
  iu: "ᐊᓂᔑᔨ",
  oj: "Aanii",
  sg: "Mbote",
  wa: "Bondjoû",
  sq: "Përshëndetje",
  kg: "Mbote",
  hr: "Pozdrav",
  cs: "Ahoj",
  da: "Hej",
  aa: "Selam",
  ar: "مرحبا",
  am: "ሰላም",
  om: "Akkam",
  br: "Demat",
  co: "Salute",
  fr: "Bonjour",
  oc: "Adieu siau",
  ti: "ሰላም",
  et: "Tere",
  fo: "Hai",
  hu: "Szia",
  fi: "Hei",
  he: "שלום",
  fj: "Bula",
  ab: "Асаулыба",
  ka: "გამარჯობა",
  os: "Салам",
  de: "Hallo",
  el: "Γεια σας",
  ht: "Bonjou",
  ja: "こんにちは",
  is: "Halló",
  as: "নমস্কাৰ",
  bh: "नमस्ते",
  gu: "નમસ્તે",
  hi: "नमस्ते",
  kn: "ನಮಸ್ಕಾರ",
  ks: "سلام",
  ml: "നമസ്കാരം",
  mr: "नमस्कार",
  or: "ନମସ୍କାର",
  pi: "नमस्ते",
  pa: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
  sa: "नमः",
  ta: "வணக்கம்",
  te: "నమస్కారం",
  id: "Halo",
  jv: "Halo",
  su: "Halo",
  ae: "𐬀𐬉𐬥𐬁𐬀",
  fa: "سلام",
  it: "Ciao",
  gv: "Moghrey mie",
  ga: "Dia dhuit",
  ny: "Moni",
  zh: "你好",
  ii: "ꆏꊂ",
  bo: "བཀྲ་ཤིས་བདེ་ལེགས།",
  ug: "ياخشىمۇسىز",
  za: "Neh ho",
  st: "Dumela",
  kk: "Сәлеметсіз бе",
  ki: "Wendo",
  ky: "Салам",
  lo: "ສະບາຍດີ",
  lv: "Sveiki",
  lt: "Sveiki",
  mg: "Salama",
  ms: "Hai",
  lb: "Moien",
  bm: "I ni ce",
  mt: "Bongu",
  mh: "Yokwe",
  mo: "Salut",
  mn: "Сайн байна уу",
  my: "မင်္ဂလာ",
  dv: "އަސްސަލާމު",
  hz: "Moro",
  kj: "Moro",
  ng: "Moro",
  na: "Alii",
  ne: "नमस्ते",
  nl: "Hallo",
  li: "Hallo",
  fy: "Hallo",
  mi: "Kia ora",
  ha: "Sannu",
  ig: "Ndewo",
  yo: "Bawo",
  kr: "Sannu",
  no: "Hei",
  nb: "Hei",
  nn: "Hei",
  se: "Bures",
  sd: "سلام",
  ur: "سلام",
  ho: "Halo",
  gn: "Mba'éichapa",
  qu: "Rimaykullayki",
  tl: "Kamusta",
  pl: "Cześć",
  pt: "Olá",
  ro: "Bună",
  av: "Салам",
  ba: "Сәләм",
  ce: "Салам",
  cv: "Салам",
  kv: "Салам",
  cu: "Здравствуйте",
  ru: "Привет",
  tt: "Сәлам",
  rw: "Muraho",
  mk: "Здраво",
  sm: "Talofa",
  ff: "Salaam aleekum",
  wo: "Salaam aleekum",
  sr: "Здраво",
  sh: "Zdravo",
  sl: "Zdravo",
  so: "Salaam",
  sk: "Ahoj",
  ko: "안녕하세요",
  an: "Hola",
  eu: "Kaixo",
  ca: "Hola",
  gl: "Ola",
  es: "Hola",
  si: "ආයුබෝවන්",
  sv: "Hej",
  rm: "Allegra",
  nd: "Lotjhani",
  sn: "Mhoroi",
  sw: "Hujambo",
  th: "สวัสดี",
  to: "Mālō e lelei",
  tg: "Салом",
  ku: "Silav",
  tr: "Merhaba",
  lg: "Gyebale ko",
  uk: "Привіт",
  kw: "Dydh da",
  gd: "Halo",
  cy: "Helo",
  tk: "Salam",
  ik: "Kiana",
  nv: "Ya'at'eeh",
  yi: "העלא",
  uz: "Salom",
  af: "Hallo",
  nr: "Lotjhani",
  ts: "Avuxeni",
  ve: "Ndaa",
  xh: "Molo",
  zu: "Sawubona",
  vi: "Xin chào",
};
export const CountriesIcons = countryIcon; // 208 entries

const CountriesIconsWithGreet = {};
Object.keys(CountriesIcons).forEach((cid) => {
  const langObj = {};
  Object.keys(CountriesIcons[cid].languages).forEach((lang) => {
    langObj[lang] = {
      ...CountriesIcons[cid].languages[lang],
      greet: Greetings[lang],
    };
  });
  CountriesIconsWithGreet[cid] = {
    ...CountriesIcons[cid],
    languages: langObj,
  };
});

const valuesOfCountryIcons = Object.values(CountriesIconsWithGreet);
const entriesCountriesIcons = Object.entries(CountriesIconsWithGreet);

const allLanguages = {};
for (const country of valuesOfCountryIcons) {
  Object.keys(country.languages).forEach((languageCode) => {
    if (allLanguages[languageCode])
      allLanguages[languageCode] = {
        ...country.languages[languageCode],
        usedIn: [...allLanguages[languageCode].usedIn, country],
      };
    else
      allLanguages[languageCode] = {
        ...country.languages[languageCode],
        usedIn: [country],
      };
  });
}

export const GetAllLanguages = allLanguages;

export const GetLanguageByCountryCode = (id) => {
  const country = CountriesIconsWithGreet[id];
  if (!country) return null;
  return Object.values(country.languages).map((lang) => lang);
};

export const GetLanguageByLanguageCode = (code) => {
  return GetAllLanguages[code?.toLowerCase()];
};

export const GetLanguagesByCountryName = (name = "") => {
  for (const [_, country] of entriesCountriesIcons) {
    if (
      country.displayName &&
      country.displayName.toLowerCase().includes(name.toLowerCase())
    ) {
      return Object.values(country.languages);
    }
  }
  return null;
};

export const GetAllCountries = valuesOfCountryIcons.map((country) => ({
  code: country.id.isoCountryCode,
  ...country,
}));

export const GetCountryDetailsByCountryCode = (id) => {
  const country = CountriesIconsWithGreet[id];
  if (!country) return null;
  return country;
};

export const GetCountryDetailsByCountryName = (name) => {
  for (const [code, country] of entriesCountriesIcons) {
    if (country.displayName.toLowerCase().includes(name.toLowerCase())) {
      return country;
    }
  }
  return null;
};
