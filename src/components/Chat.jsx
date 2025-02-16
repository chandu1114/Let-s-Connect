import { useContext } from "react";
import Input from "./Input";
import Messages from "./Messages";
import { ChatContext } from "../context/ChatContext";

function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chat-info">{data.user?.displayName}</div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
