function Login() {
  return (
    <div className="register-container">
      <div className="form">
        <div className="wrapper">
          <h2 className="app-name">Let's connect</h2>
          <p className="title">Login</p>
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
          <p className="login-text">Don't have an account ? Register</p>
        </div>
      </div>
    </div>
  );
}
export default Login;
