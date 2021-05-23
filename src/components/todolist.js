import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

//importing component
import TodoItem from '../components/todoitem.js'

//react-bootstrap
import { Container,Row,Col} from 'react-bootstrap';

const TodoList = ({todos,setTodos,edittodo,seteditTodo}) =>
{
      return(
  
         <>
          <Container>
            <Row>
              <Col xs={12} md={4}>

              </Col>
              <Col xs={12} md={4}>
                <div className="my-1  ">
                  <div >
                    {todos.length !== 0 ?
                      todos.map((todo, index) => {
                        return (
                          <>
                            <TodoItem key={index} todo={todo} todos={todos} setTodos={setTodos} edittodo={edittodo} seteditTodo={seteditTodo} />

                          </>

                        )
                      })

                      : "No todo(s) found!!!"}

                  </div>

                </div>
              </Col>
            </Row>
          </Container> 
        </>
      )
}

export default TodoList;