import React ,{useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

//react-bootstrap
import { Card,Button} from 'react-bootstrap';

import { CredentialsContext } from "../App";


const TodoItem = ({todo,setTodos,todos,seteditTodo}) =>
{
  const {token} = useContext(CredentialsContext);

  //delete Todo
  const handleDelete = ({_id}) =>
  {

      fetch(`https://fullstacktodo-server.herokuapp.com/delete-todo/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((response)=>response.data)
    .then(() => setTodos(todos.filter((t)=>t._id !== todo._id)))
    .catch((err)=>console.log(err));
  }

  //edit Todo
  const handleEdit= ({_id}) =>
  {
      const mapped = todos.find((task)=>
      {
        return task._id === _id;
      });
     // console.log(mapped);
      seteditTodo(mapped);  
  }

  //update Todo
  const handleToggle = ({_id}) =>
  {
    let toggleTodos = todos.map(todo => {
      return todo._id === _id ? { ...todo, completed: !todo.completed } : { ...todo};
    });
    let toggledTodo = todos.find((todo)=>
    { 
      return todo._id === _id ;
    }) ;
    toggledTodo.completed = !toggledTodo.completed
    //console.log(toggleTodos);
    fetch(`https://fullstacktodo-server.herokuapp.com/update-todo/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body:JSON.stringify(toggledTodo)
    }).then((response)=>response.data)
    .then(() => setTodos(toggleTodos))
    .catch((err)=>console.log(err));


  }
 
    return(
      <>
    <Card >
  <Card.Body>
    <Card.Text>
    <h6  className={todo.completed? "strike" : ""}> <b className="text-style" style={{fontSize:"12px"}}>{todo.title} </b> </h6>
    </Card.Text>
    <Button variant="success"style={{fontSize:"12px"}} className=" text-style float-left mr-3 "  onClick={()=>handleToggle(todo)}>Done</Button>
    <Button variant="info" style={{fontSize:"12px"}}className=" text-style float-left mr-2" onClick={()=>handleEdit(todo)}>Edit</Button>
    <Button variant="danger" style={{fontSize:"12px"}}className=" text-style float-right  mr-2"  onClick={()=>handleDelete(todo)}>Delete</Button>
  </Card.Body>
</Card>    
       </>     
      )
}

export default TodoItem;
