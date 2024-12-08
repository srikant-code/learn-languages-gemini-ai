import { useEffect } from "react";

export const useSetHeaderTitle = (title) => {
  useEffect(() => {
    document.title = `Language Learning | Gemini AI - ${title}`;
    document.getElementById("root").style.height = "100%";
  });
};
