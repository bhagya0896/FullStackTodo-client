import React, { useState, useContext } from "react";
import { useHistory,Link } from "react-router-dom";
import { CredentialsContext } from "../App";
import 'bootstrap/dist/css/bootstrap.min.css';

//react-bootstrap
import { Button,Container,Form,Row, Col, Card} from 'react-bootstrap'
import '../App.css';

export const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  
  return response.json();
};

export default function Login({handleLogin}) {
  
 
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const login = (e) => {
    e.preventDefault();
    const user = {
      userName,
      password,
    }

    fetch(`http://localhost:8080/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    })
      .then(handleErrors)
      .then((data) => {
        const {token}=data;
        console.log(token)
        handleLogin(user,token)
        history.push("/todos");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const history = useHistory();

  return (
    <Container fluid="md" className="my-5">
      <Row>
      <Col xs={12} md={4}></Col>

        <Col xs={12} md={4} >
          <Card>
            <Card.Header className="text-center p-3"> <h6 className="text-style">Log In</h6></Card.Header>
            
            <Card.Body>
              <Card.Text>
                <Form onSubmit={login}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="text-style" style={{fontSize:"12px"}} >User Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" style={{fontSize:"10px"}} onChange={(e) => setUsername(e.target.value)} value={userName} />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="text-style"style={{fontSize:"12px"}} >Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"style={{fontSize:"10px"}}  onChange={(e) => setPassword(e.target.value)} value={password} />
                  </Form.Group>
                  <Button variant="success" type="submit"  block size="sm" className="text-style">
                    Login
                  </Button>
                  <br></br>
                  <p className="text-center text-muted small text-style">Don't have an account? <Link to="/register" className="text-style" style={{color:'black'}}><b>Sign up here!</b></Link></p>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {error && <span style={{ color: "red" }}>{error}</span>}
    </Container>
      
  );
}