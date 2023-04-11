import React from "react";

import ChatControl from "../ChatControl";

export default function SideBarContainer() {
  return (
    <div className="flex flex-col w-[350px] min-h-screen relative bg-dark-ocean p-4">
      <ChatControl />
    </div>
  );
}
