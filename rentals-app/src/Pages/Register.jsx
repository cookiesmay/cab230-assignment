import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap"; 
import { register } from "../API/api"; 

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); 
    setSuccess(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }
    try {
      const data = await register(email, password);
      
      if (data.error) {
        setError(data.message || "Registration failed.");
        return;
      }

      setSuccess(true);
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(err.message || "An error occurred during registration. Email might already be in use.");
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "500px" }}>
      <div className="p-4 border border-2 border-dark bg-white shadow-sm">
        <h3 className="fw-bold text-uppercase mb-4">Create Account</h3>
        
        {error && <Alert variant="danger" className="rounded-0">{error}</Alert>}
        {success && <Alert variant="success" className="rounded-0">Account created successfully! Redirecting to login...</Alert>}
        
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold">EMAIL ADDRESS</Form.Label>
            <Form.Control 
              type="email" 
              required 
              className="rounded-0 border-dark" 
              value={email}
              onChange={e => setEmail(e.target.value)} 
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold">PASSWORD</Form.Label>
            <Form.Control 
              type="password" 
              required 
              minLength={6}
              className="rounded-0 border-dark" 
              value={password}
              onChange={e => setPassword(e.target.value)} 
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="small fw-bold">CONFIRM PASSWORD</Form.Label>
            <Form.Control 
              type="password" 
              required 
              className="rounded-0 border-dark" 
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)} 
            />
          </Form.Group>

          <Button type="submit" variant="dark" className="w-100 rounded-0 fw-bold mb-3">
            REGISTER
          </Button>

          <div className="text-center small">
            Already have an account? <Link to="/login" className="text-decoration-none fw-bold">Sign In</Link>
          </div>
        </Form>
      </div>
    </Container>
  );
}