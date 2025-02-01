function Register() {
  return (
    <div className="register-container">
      <div className="form">
        <div className="wrapper">
          <h2 className="app-name">Let's connect</h2>
          <p className="title">Register</p>
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
          <p className="login-text">already have account ? Login</p>
        </div>
      </div>
    </div>
  );
}
export default Register;
