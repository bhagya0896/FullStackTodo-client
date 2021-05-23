import React , {useState,useEffect,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

//react-bootstrap
import { Container,Row,Col,Card,Button} from 'react-bootstrap';
import { CredentialsContext } from "../App";


const TodoForm = ({todos,setTodos,edittodo,seteditTodo}) =>
{
    const [title,setTitle]= useState("");
    const {token}= useContext(CredentialsContext);


    //add Todo 
   const handleAddTodo = (myTodo) =>
    {
        fetch(`https://fullstacktodo-server.herokuapp.com/add-todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:token,
        },
        body: JSON.stringify(myTodo),
      }).then((response)=>response.json())
      .then((data)=>console.log(data))
      .catch((err)=>console.log(err))
      .then(()=>setTodos([...todos,myTodo]));
      setTitle("")
    }
    //update Todo
    const updateTodo = (_id,title,completed) =>
    {
      console.log("updated")
        const myUpdatedTodo =
        {
        
          title: title,
    
        }
        console.log(myUpdatedTodo._id)
        const newTodos = todos.map((todo)=>
        todo._id === _id ? {_id , title,completed}:todo
        );
        fetch(`https://fullstacktodo-server.herokuapp.com/update-todo/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myUpdatedTodo),
      }).then((response)=>response.data)
      .catch((err)=>console.log(err))
      .then(()=>setTodos(newTodos));
      seteditTodo("")
     }
      
  useEffect(()=>
  {
    if(edittodo)
    {
      setTitle(edittodo.title);
    }else{
      
      setTitle("");
    }

  },[setTitle,edittodo])

  
  const submit = (e) => {
    e.preventDefault();
    if (!edittodo) {

      if (!title) {
        alert("Enter todo before submitting...");
      }
      else {
        const myTodo = {
          title: title,
          completed:false
        }
        console.log(myTodo)
        handleAddTodo(myTodo)
      }
    }
  else {
      updateTodo(edittodo._id,title,edittodo.completed) 
  }     
    }
      return(
        <>
          <Container>
            <Row>
              <Col xs={12} md={4}>
              </Col>
              <Col xs={12} md={4}>
              <Card className="my-4">
                <Card.Header className="text-style">  Todos({todos.length}) </Card.Header>
                <Card.Body>
                  <Card.Text>
                  <form onSubmit={submit}>
                      <div className="form-group ">
                        <input type="text" className="form-control w-100 text-style"style={{fontSize:"10px"}} value={title} onChange={(e) => setTitle(e.target.value)
                        } id="todo-input" placeholder="Enter todo here" />
                      </div>
                   {edittodo? <Button type="submit" variant="warning" style={{color:"white",fontSize:"12px"}}>Update</Button>: <Button type="submit" style={{color:"white",fontSize:"12px"}} variant="success">Submit</Button>}  
                  </form>
                  </Card.Text>
                </Card.Body>
              </Card>
              </Col>
            </Row>
          </Container>
        
        </>

      )
}

export default TodoForm;
