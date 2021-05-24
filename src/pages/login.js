import React, { useState, useContext } from "react";
import { useHistory,Link } from "react-router-dom";
import { CredentialsContext } from "../App";
import 'bootstrap/dist/css/bootstrap.min.css';

//react-bootstrap
import { Button,Container,Form,Row, Col, Card} from 'react-bootstrap'
import '../App.css';


export default function Login({handleLogin}) {
  
 
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const[message,setMessage] = useState("");


  const login = (e) => {
    e.preventDefault();
    const user = {
      userName,
      password,
    }

    fetch(`https://fullstacktodo-server.herokuapp.com/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    })
      .then((res)=>res.json()
    )
      .then((data) => {
        console.log(data.message)
        setMessage(data.message);
        const {token}=data;
        if(token)
        {
         // console.log(token)
          handleLogin(user,token);
          history.push('/todos')
        }
        setUsername("");
        setPassword("");
      
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
            <Card.Header className="text-center p-3"> <h6 className="text-style" style={{fontSize:"18px"}}>Log In</h6></Card.Header>
            
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
                <hr></hr>
               <hr></hr>
                  <div className="text-style">
                  <p style={{ color: "green",textAlign:"center" }}>{message}</p>
                  {error && <span  style={{ color: "red",textAlign:"center" }}>{error}</span>}
                  </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    
    </Container>
      
  );
}
