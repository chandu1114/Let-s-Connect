import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { curUser } = useContext(AuthContext);
  const email = curUser.email;
  const userName = !email ? "" : email.split("@");

  return (
    <div className="navbar">
      <h2 className="app-name">Let's Connect</h2>
      <h2 className="user-name">👤{!email ? "" : userName[0]}</h2>
      <button className="logout" onClick={() => signOut(auth)}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
