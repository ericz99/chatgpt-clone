import React from "react";
import { useLocalContextState } from "@/shared";

import Button from "./Button";

type ApiKeyLoader = {
  onModalHandle: () => void;
};

export default function ApiKeyLoader({ onModalHandle }: ApiKeyLoader) {
  const { apiKey } = useLocalContextState((state) => state);

  return (
    <div className="flex container max-w-6xl mx-auto px-4 items-center">
      <span className="mr-4 font-bold text-white">OpenAI API Key</span>
      <Button type="button" onClick={onModalHandle}>
        Enter API Key
      </Button>
      <span
        className={`ml-2 ${
          !apiKey
            ? "h-3 w-3 bg-red-600 rounded-full"
            : "h-3 w-3 bg-green-600 rounded-full"
        }`}
      />
    </div>
  );
}
