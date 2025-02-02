import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { name, email, password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        username: name,
        email,
        id: res.user.uid,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});

      navigate("/");
    } catch (err) {
      alert("Oops!Someting went wrong!");
      console.log(err);
    }
  };

  return (
    <div className="register-container">
      <div className="form">
        <div className="wrapper">
          <h2 className="app-name">Let's connect</h2>
          <p className="title">Register</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="regis-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="regis-input"
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              className="regis-input"
            />
            <button className="sign-up">Sign up</button>
          </form>
          <p className="login-text">already have account ? Login</p>
        </div>
      </div>
    </div>
  );
}
export default Register;
