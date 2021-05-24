import React, { useState,useContext} from "react";
import { useHistory,Link } from "react-router-dom";

//react-bootstarp
import { Button,Container,Form,Row, Col, Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';


export default function Register() {

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const[message,setMessage] = useState("");

  const register = (e) => {
    e.preventDefault();
    setMessage("");

    return fetch(`https://fullstacktodo-server.herokuapp.com/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    })
      .then((res)=>
       res.json()
     )
      .then((data) => {
      //console.log(data.message);
      setMessage(data.message);
      setPassword("");
      setUsername("") 
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
          <Card.Header className="text-center p-3"> <h6 className="text-style" style={{fontSize:"18px"}}>Register</h6></Card.Header>
          
          <Card.Body>
            <Card.Text>
              <Form onSubmit={register}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="text-style" style={{fontSize:"12px"}}>User Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter username"style={{fontSize:"10px"}} onChange={(e) => setUsername(e.target.value)} value={userName} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="text-style" style={{fontSize:"12px"}}>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password"style={{fontSize:"10px"}} onChange={(e) => setPassword(e.target.value)} value={password} />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox"className="text-style" style={{fontSize:"12px"}}label="Check me out" required="required"/>
                </Form.Group>
                <Button variant="success" type="submit"  block size="sm" className="text-style">
                  Register
                </Button>
                <br></br>
                <p className="text-center text-style small text-muted" >Already have an account? <Link to="/" style={{color:"black"}}><b>Login here</b></Link></p>
               <hr><hr>
                  <hr></hr>
                  <div className="text-style">
                  <p style={{ color: "green",textAlign:"center" }}>{message}</p>
                  {error && <span  style={{ color: "red",textAlign:"center" }}>{error}</span>}
                  </div>
              </Form>
             
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
 
  </Container>

     
  
  );
}
