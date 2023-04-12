import React, { useState, useRef } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useMessageState, useLocalContextState } from "@/shared";

import MessageBox from "../MessageBox";
import ChatConversation from "../ChatConversation";
import ApiKeyLoader from "../ApiKeyLoader";

type MainContainerProps = {
  onModalHandle: () => void;
};

export default function MainContainer({ onModalHandle }: MainContainerProps) {
  const { apiKey } = useLocalContextState((state) => state);
  const { chatHistory, addMessageToHistory } = useMessageState(
    (state) => state
  );
  const $formRef = useRef<HTMLFormElement>(null);
  const $answerRef = useRef<HTMLParagraphElement>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [streaming, setStreaming] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setPrompt(e.target.value);

  const onClose = () => {
    setStreaming(false);
    addMessageToHistory({
      role: "system",
      content: $answerRef.current?.innerText.replace(/<br>g/, "\n") as string,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    if ($answerRef.current) $answerRef.current.innerHTML = "";
    setStreaming(true);
    setError(null);

    // # update chat history
    addMessageToHistory({
      role: "user",
      content: prompt,
    });

    fetchEventSource("/api/prompt", {
      method: "POST",
      headers: {
        Authorization: apiKey,
      },
      body: JSON.stringify({
        prompt:
          chatHistory.length === 0
            ? [
                {
                  role: "system",
                  content:
                    "You are an AI with amazing knowledge, please respond back like an human.",
                },
                {
                  role: "user",
                  content: prompt,
                },
              ]
            : [
                {
                  role: "user",
                  content: prompt,
                },
              ],
      }),
      openWhenHidden: true,
      async onopen(res) {
        console.log(res);
      },
      onmessage(msg) {
        const { data } = msg;

        try {
          if (data == "[DONE]") return;
          let text = JSON.parse(data).choices[0].delta.content;
          if (text) {
            $answerRef.current!.innerHTML += text;
          }
        } catch (err) {
          console.log(err);
          console.log(`Failed to parse data: ${data}`);
        }
      },
      onclose() {
        console.log("closed");
        onClose();
      },
      onerror(e) {
        console.log("error");
        console.log(e);
        setStreaming(false);

        if (e) {
          setError(`Invalid request: Error ${e}`);
        }
      },
    });

    // # create form prompt
    setPrompt("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey == false) {
      e.preventDefault();
      e.stopPropagation();
      $formRef.current?.requestSubmit();
    }
  };
  return (
    <div className="flex min-h-screen relative w-full">
      <div className="w-full flex flex-col flex-1">
        <ChatConversation
          ref={$answerRef}
          error={error}
          streaming={streaming}
        />

        <form
          onSubmit={onSubmit}
          ref={$formRef}
          className="flex fixed bottom-0 left-0 w-full"
        >
          <div className="w-full">
            <ApiKeyLoader onModalHandle={onModalHandle} />
            <MessageBox
              onChange={onChange}
              value={prompt}
              onKeyDown={onKeyDown}
              hasApiKey={!!apiKey}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
