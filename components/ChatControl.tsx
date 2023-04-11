import { AiFillMessage } from "react-icons/ai";

import Button from "./Button";

export default function ChatControl() {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex flex-1">
        <Button icon={<AiFillMessage color="#ffffff" size={24} />}>
          New Chat
        </Button>
      </div>
    </div>
  );
}
