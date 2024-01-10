import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../../../../context/AuthContext";
import { login, setAuthToken } from "../../../../service/Api";

function LoginForm() {
  const { isAuthenticated, handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("token", token);
        setAuthToken(token);
        handleLogin(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setError(error.response.data.message || "Login failed!");
        } else {
          setError("An unexpected error occurred!");
        }
      });
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="md-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {error.username &&
            error.username.map((message, idx) => (
              <Alert key={idx} variant="danger">
                {message}
              </Alert>
            ))}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error.password &&
            error.password.map((message, idx) => (
              <Alert key={idx} variant="danger">
                {message}
              </Alert>
            ))}

          {error.general && <Alert variant="danger">{error.general}</Alert>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>      
    </div>
  );
}

export default LoginForm;
