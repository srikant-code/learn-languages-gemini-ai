import moment from "moment";

export const ValidateCustomRegex = (text, regex) => {
  try {
    return regex.test(String(text));
  } catch (err) {
    try {
      const re = new RegExp(regex);
      return re.test(String(text));
    } catch (err) {
      return console.log(err);
    }
  }
};

export const FormatNumber = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

export const Capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const RetrieveKeyFromObject = (obj, value) => {
  let desiredKey = "";
  for (const key in obj) {
    if (obj[key]?.toLowerCase() === value?.toLowerCase()) {
      desiredKey = key;
      break;
    }
  }
  return desiredKey;
};

export const ScrollToTop = (id = "#root", scrollAmount = 500) => {
  const body = document.querySelector(id);
  body.scrollIntoView(
    {
      behavior: "smooth",
    },
    scrollAmount
  );
};

export const ScrollToBottom = (element = document.querySelector("#root")) =>
  element.scrollIntoView({ behavior: "smooth", block: "end" });

export const SearchMatchHighlighter = (text, matchWith, renderFunction) => {
  if (matchWith === "" || matchWith.trim() === "") return text;
  matchWith = matchWith.replaceAll("+", "[+]").replaceAll("(", "\\(");
  try {
    const regex = new RegExp("(" + matchWith.replace(/\)/g, "\\)") + ")", "gi");
    if (text.split) {
      const textSplit = text.split(regex);
      const resultTextArray = textSplit.map((word, index) => {
        return renderFunction ? (
          renderFunction(word, matchWith, index)
        ) : word?.toUpperCase() === matchWith?.toUpperCase() ? (
          <span
            key={index}
            style={{
              backgroundColor: "hsl(var(--nextui-primary-400)",
            }}
            className="rounded-lg py-0 px-1 text-white">
            {word}
          </span>
        ) : (
          <span key={index}>{word}</span>
        );
      });
      return (
        <>
          {resultTextArray}
          {/* {console.log({ text })} */}
        </>
      );
    }
  } catch (e) {
    console.log(e);
  }
  return <>-</>;
};

export const ConvertCamelCaseToTitles = (text = "testStringIsRendered") => {
  const result = text?.replace(/([A-Z][a-z])/g, " $1")?.replaceAll("_", " ");
  return result?.charAt(0)?.toUpperCase() + result?.slice(1);
};

export const GetElementByID = (id) =>
  document.getElementById(id) ? document.getElementById(id).value : "";

export const GetElementByIDs = (ids) => ids.map((id) => GetElementByID(id));

export const MakeNullIfEmpty = (value, formatIt = true) =>
  value === "" ? null : formatIt ? value?.toLowerCase()?.trim() : value;
export const MakeUpperCaseNullIfEmpty = (value, formatIt = true) =>
  value === "" ? null : formatIt ? value?.toUpperCase()?.trim() : value;
export const MakeNullIfEmptyArray = (arr) => (arr && arr?.length ? arr : null);

export const GrammarSingularPlural = (text, value) =>
  value > 1 ? `${text}s` : text;

export const LengthOf = (text) =>
  typeof text === "string" ? text?.trim().length : text;

export const GetInitials = (string) => {
  const names = string.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export const TrimStartAndUpperCase = (text = "") =>
  text.trimStart().toUpperCase();

export const TrimAndUpperCase = (text = "") =>
  typeof text === "string" ? text?.trim()?.toUpperCase() : text;

export const CopyToClipboard = (text, dontShowText = false) => {
  if (typeof text !== "string") return false;
  else {
    // CreateNotification(
    //   "Please copy this manually by selecting it 📋",
    //   "",
    //   STRINGS.VARIANTS.WARNING
    // );
    // CreateNotification(
    //   "Successfully copied to clipboard 📋",
    //   dontShowText ? "" : text,
    //   STRINGS.VARIANTS.SUCCESS
    // );
    navigator.clipboard?.writeText && navigator.clipboard.writeText(text);
    return true;
  }
};

export const SortObjectByDate = (
  dateA,
  dateB,
  direction = STRINGS.SORT_TYPES.ASC
) => {
  const formats = [STRINGS.DATE_TYPES.DD_MM_YYYY]; // can be several
  return (
    // (moment(dateA, formats).isBefore(moment(dateB, formats))
    //   ? -1
    //   : moment(dateA, formats).isAfter(moment(dateB, formats))
    //   ? 1
    //   : 0) * (direction === STRINGS.SORT_TYPES.ASC ? 1 : -1)
    true
  );
};

export const Sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const ObjectIsNotEmpty = (obj) => Object.keys(obj)?.length > 0;

export const Contains = (text1, text2) =>
  text1?.toLowerCase().includes(text2?.toLowerCase());

export const EncodeAndTrim = (val) => {
  return encodeURIComponent(val?.trim ? val?.trim() : val);
};

export const CopyProps = (heading = "", value = "") => {
  return {
    title: `Click to copy ${heading}`,
    style: { cursor: "copy" },
    onClick: () => CopyToClipboard(value),
  };
};

export const GetMaerskRandomColor = (randomInteger) => {
  const colors = [
    "#B5E0F5",
    "#EDEDED",
    "#FFBAA6",
    "#AAEAE0",
    "#E2EF00",
    "#FFDE74",
    "#FFB302",
    "#C5E5C2",
    "#FFEBA8",
    "#E9B2B7",
  ];
  return colors[Math.floor((randomInteger + colors?.length) % colors.length)];
};

export const Debounce = (func) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 500);
  };
};

export const RemoveDuplicatesFromArray = (
  arr,
  compareArray = ["place", "name"]
) =>
  arr.filter(
    (v, i, a) =>
      a.findIndex((v2) => compareArray.every((k) => v2[k] === v[k])) === i
  );

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const ConvertMillToMomentCalendar = (time) => {
  return moment(parseInt(time)).calendar();
};

export const RandomFromArray = (myArray) => {
  const randomIndex = Math.floor(Math.random() * myArray.length);
  return myArray[randomIndex];
};

export const GetRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const GetContrastColor = (color) => {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
};

export const GetGradient = (color) => {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);

  const gradient = [];
  for (let i = 0; i <= 1; i += 0.2) {
    const newR = Math.floor(r * i)
      .toString(16)
      .padStart(2, "0");
    const newG = Math.floor(g * i)
      .toString(16)
      .padStart(2, "0");
    const newB = Math.floor(b * i)
      .toString(16)
      .padStart(2, "0");
    gradient.push("#" + newR + newG + newB);
  }

  return gradient;
};

export const GetColorContrastAndGradient = (color) => {
  if (!color) color = GetRandomColor();
  const contrast = GetContrastColor(color);
  const gradient = GetGradient(color);
  return {
    color,
    contrast,
    gradient,
  };
};

export const ShuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const RemoveNullValuesFromArray = (arr, func = (k) => !k) => {
  return arr?.filter(func);
};
