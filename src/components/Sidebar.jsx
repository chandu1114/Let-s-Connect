import Chats from "./Chats";
import Navbar from "./Navbar";

function Sidebar() {
  return (
    <div className="sidebar">
      <Navbar />
      <Chats />
    </div>
  );
}

export default Sidebar;
