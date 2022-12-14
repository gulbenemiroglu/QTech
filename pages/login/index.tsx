import { useState } from "react";
import { useSession } from "contexts/Session";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Login = () => {
  const { login } = useSession();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Row className="login">
        <Col lg={6}>
          <Form>
            <h3 className="mb-3">Sign In</h3>
            <Form.Label className="mb-1">Username</Form.Label>
            <Form.Control
              name="username"
              placeholder="Enter username"
              onChange={onChange}
              className="mb-3"
            />
            <Form.Label className="mb-1">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={onChange}
              className="mb-3"
            />
            <div className="d-grid">
              <Button onClick={() => login(credentials)} variant="primary">
                Sign In
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
