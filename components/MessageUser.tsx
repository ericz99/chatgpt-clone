import React from "react";
import { AiOutlineUser } from "react-icons/ai";

type MessageUserProps = {
  content: string;
  role: string;
};

export default function MessageUser({ content, role }: MessageUserProps) {
  return (
    <div className="bg-[#444654] py-8 px-4 w-full text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="border-2 border-solid rouned-md border-white inline-block p-2 mb-2">
          <AiOutlineUser size={24} color="#ffffff" />
        </div>

        <p>{content}</p>
      </div>
    </div>
  );
}
