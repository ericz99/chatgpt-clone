import React, { Ref, forwardRef } from "react";
import { AiOutlineRobot } from "react-icons/ai";

type MessageErrorProps = {
  error: string;
};

export default function MessageError({ error }: MessageErrorProps) {
  return (
    <div className="py-8 px-4 w-full bg-red-700 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="border-2 border-solid rouned-md border-white inline-block p-2 mb-2">
          <AiOutlineRobot size={24} color="#ffffff" />
        </div>

        <p>{error}</p>
      </div>
    </div>
  );
}
