import React from "react";
import { TbSend } from "react-icons/tb";

export default function MessageBox() {
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div className="flex justify-center items-center h-32 container max-w-6xl mx-auto p-4">
        <div className="relative w-full">
          <input
            type="text"
            className="rounded-lg w-full p-4 border-solid border-2 border-indigo-600 shadow-lg shadow-indigo-500/50"
          />

          <span className="absolute top-4 right-6 opacity-60">
            <TbSend color="#7F8487" size={24} />
          </span>
        </div>
      </div>
    </div>
  );
}
