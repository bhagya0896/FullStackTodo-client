import React ,{useState,useEffect,useContext}from 'react' ;
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

//importing components
import TodoForm from '../components/todoform.js';
import TodoList from '../components/todolist.js';

//react-bootstrap
import { Navbar,Nav,Button} from 'react-bootstrap';
import  logo from '../pages/images/logo.png';


import { CredentialsContext } from "../App";

function Todos () 
{
  const [todos , setTodos] = useState([]);
  const [edittodo , seteditTodo] = useState("");
  const {token,logout} = useContext(CredentialsContext);

 /* console.log(todos);
  console.log(token)*/

  useEffect(() => {
    fetch(`https://fullstacktodo-server.herokuapp.com/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data)=>{console.log(data)
      setTodos(data)})   ;
  }, []);


 /*
  const handleFilter = () =>
  {
    const filteredTodos = todos.filter((todo)=>
      {return !todo.completed}
    );
    setTodos(filteredTodos)
  
    fetch(`http://localhost:8080/delete-todo/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response)=>response.data)
    .catch((err)=>console.log(err));
   {todos.length===0?"": 
        <div class="text-center">
           <button type="button" class="btn btn-secondary btn-sm mr-5" onClick={()=>handleFilter()}>Clear Done Todos</button>
        </div>
        }
         
  }*/
    
    return(
<>

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
              <Button onClick={logout} variant="danger" style={{fontSize:"12px"}}><b>LogOut</b></Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
          <TodoForm todos={todos} setTodos={setTodos}  edittodo={edittodo} seteditTodo={seteditTodo} />
           <TodoList todos={todos} setTodos={setTodos} edittodo={edittodo} seteditTodo={seteditTodo} />
         
       
        </>

    )
}

export default Todos;
