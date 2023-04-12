import React, { Ref, forwardRef } from "react";
import { AiOutlineRobot } from "react-icons/ai";

type MessageSystemProps = {
  content: string;
  role: string;
};

const MessageSystem = forwardRef(function MessageSystem(
  { content }: MessageSystemProps,
  ref?: Ref<HTMLParagraphElement> | undefined
) {
  return (
    <div className="py-8 px-4 w-full bg-gray-700 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="border-2 border-solid rouned-md border-white inline-block p-2 mb-2">
          <AiOutlineRobot size={24} color="#ffffff" />
        </div>

        <p ref={ref}>{content}</p>
      </div>
    </div>
  );
});

export default MessageSystem;
