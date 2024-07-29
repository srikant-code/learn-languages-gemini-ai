import React from "react";

const Etymology = ({ etymology }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">History</h2>
      <p className="ml-3">{etymology}</p>
    </div>
  );
};

export default Etymology;
