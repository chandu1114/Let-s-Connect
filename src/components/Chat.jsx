import Input from "./Input";
import Messages from "./Messages";

function Chat() {
  return (
    <div className="chat">
      <div className="chat-info">Gupta</div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
