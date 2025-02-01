import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

function Main() {
  return (
    <div className="main-container">
      <div className="wrapper">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Main;
