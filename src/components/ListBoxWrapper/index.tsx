import React from "react";
export const ListboxWrapper = ({ children }) => (
  <div className="w-full  border-small px-2 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div> // min-w-[260px]
);
