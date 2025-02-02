import { useNavigate, Link } from "react-router";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);

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
          <p className="title">Login</p>
          <form onSubmit={handleSubmit}>
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
            <button className="sign-up">Login</button>
          </form>
          <p className="login-text">
            Don't have an account ? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
