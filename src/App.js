import React, {useEffect, useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router,Switch,Route,useHistory} from 'react-router-dom';

//importing components
import Login from './pages/login.js';
import Register from './pages/register.js';
import Welcome from './pages/welcome.js';
import Todos from './components/todos.js';


//useContext
export const CredentialsContext = React.createContext(
{
  user:null,
  token:null,
  logout:()=>{}
}
);

//App component
const App = () =>
{

  const history = useHistory();
  const [user, setUser]=useState(null);
  const [token,setToken]=useState(null);

 
  const logout = ()=>{
    localStorage.clear();
    window.location.href = '/';
  
}


const handleLogin = (usr,token)=>{
  setUser(usr);
  setToken(token);

  localStorage.setItem("auth_token",token);
}


      return(

        <>
       <CredentialsContext.Provider value={
         {  user,
          token,
          logout}
       }>
          <Router>
            <Switch>
              
              <Route exact path="/register">
              <Welcome />
                  <Register/>
              </Route>

              <Route exact path="/">
              <Welcome />
                  <Login handleLogin={handleLogin}/>
              </Route>

              <Route exact path="/todos">
                  <Todos logout={logout}/>
              </Route>

            </Switch>
          </Router>

        </CredentialsContext.Provider>
        </>

      )
}

export default App;