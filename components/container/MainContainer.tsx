import React from "react";

import MessageBox from "../MessageBox";
import ChatConversation from "../ChatConversation";

export default function MainContainer() {
  return (
    <div className="flex min-h-screen relative p-4 w-full">
      <div className="w-full flex flex-col flex-1">
        <ChatConversation />
        <MessageBox />
      </div>
    </div>
  );
}
