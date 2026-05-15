import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Container, Form, Button, Alert} from "react-bootstrap";
import { login } from "../API/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setToken } = useOutletContext(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      
      if (data.token) {
        setToken(data.token);
        navigate("/"); 
      }
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "500px" }}>
      <div className="p-4 border border-2 border-dark bg-white shadow-sm">
        <h3 className="fw-bold text-uppercase mb-4">Login</h3>
        {error && <Alert variant="danger" className="rounded-0">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold">EMAIL ADDRESS</Form.Label>
            <Form.Control type="email" required className="rounded-0 border-dark" onChange={e => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="small fw-bold">PASSWORD</Form.Label>
            <Form.Control type="password" required className="rounded-0 border-dark" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100 rounded-0 fw-bold">SIGN IN</Button>
        </Form>
      </div>
    </Container>
  );
}