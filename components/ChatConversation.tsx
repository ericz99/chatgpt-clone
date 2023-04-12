import { Ref, forwardRef, useEffect, useRef } from "react";
import { useMessageState } from "@/shared";

import MessageUser from "./MessageUser";
import MessageSystem from "./MessageSystem";

type ChatConversationProps = {
  streaming: boolean;
};

const ChatConversation = forwardRef(function ChatConversation(
  { streaming }: ChatConversationProps,
  ref: Ref<HTMLParagraphElement> | undefined
) {
  const $scrollToBottomRef = useRef<HTMLDivElement>(null);
  const { chatHistory } = useMessageState((state) => state);

  useEffect(() => {
    if (streaming) {
      // # to the bottom
      $scrollToBottomRef!.current!.scrollIntoView();
    }
  }, [streaming]);

  return (
    <div className="flex-1 overflow-y-scroll flex flex-col w-full h-full bg-[#444654]">
      <div className="flex flex-col justify-start items-start h-full w-full overflow-y-scroll">
        {chatHistory.length > 0 &&
          chatHistory.map((message, idx) => {
            const { role, content } = message;

            return (
              <div key={idx} className="block w-full">
                {role === "user" ? (
                  <MessageUser role={role} content={content} />
                ) : (
                  <MessageSystem role={role} content={content} />
                )}
              </div>
            );
          })}

        {streaming && <MessageSystem ref={ref} content="" role="" />}
      </div>

      <div ref={$scrollToBottomRef} />
      <div className="w-full h-32 md:h-48 flex-shrink-0" />
    </div>
  );
});

export default ChatConversation;
