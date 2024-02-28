import React from "react";
import { TbSend } from "react-icons/tb";

type MessageBoxProps = {
  onChange: (e: any) => void;
  value: string;
  onKeyDown: (e: any) => void;
  hasApiKey: boolean;
};

export default function MessageBox({
  onChange,
  onKeyDown,
  value,
  hasApiKey,
}: MessageBoxProps) {
  return (
    <div className="flex justify-center items-center h-32 container max-w-6xl mx-auto p-4">
      <div className="relative w-full">
        <textarea
          style={{ height: "96px", maxHeight: "200px" }}
          className="text-black rounded-lg w-full p-4 border-solid border-2 border-indigo-600 shadow-lg shadow-indigo-500/50 resize-none"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
          disabled={!hasApiKey}
        />

        <span className="absolute bottom-6 right-6 opacity-60">
          <TbSend color="#7F8487" size={24} />
        </span>
      </div>
    </div>
  );
}
