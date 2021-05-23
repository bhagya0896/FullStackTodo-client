import React ,{useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import { CredentialsContext } from "../App";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

//react-bootstrap
import { Navbar,Nav} from 'react-bootstrap'
import  logo from './images/logo.png'

const Welcome = () =>
{ 
  const {user} = useContext(CredentialsContext);

  return(
  <>
      {!user && <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home" >
            <img
              alt=""
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top float-left "
            />
          </Navbar.Brand>
          <Navbar.Brand href="/"><b>ToDo</b></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/register"><b>Register</b></Nav.Link>
              <Nav.Link href="/"><b>Login</b></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      }
    
  </>
    )
}

export default Welcome;