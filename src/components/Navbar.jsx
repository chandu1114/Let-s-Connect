import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

function Navbar() {
  return (
    <div className="navbar">
      <h2 className="app-name">Let's Connect</h2>
      <h2 className="user-name">👤Chandu</h2>
      <button className="logout" onClick={() => signOut(auth)}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
