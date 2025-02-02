import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { curUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!curUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
