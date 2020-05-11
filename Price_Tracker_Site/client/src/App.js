import React from 'react';
import { BrowserRouter ,Route ,Switch } from 'react-router-dom'

import Navbar from './components/navbar'
import register from './components/register'
import login from './components/login'
import home from './components/home'
import Dashboard from './components/dashboard'
import { PrivateRoute } from './PrivateRoute'
import  Test  from './components/test'

class App extends React.Component{
  constructor(props){
  super(props)
  this.state={
    LoggedIn:false
  }
  }
  render(){
  return (
    <div class="contatiner">
      
      <BrowserRouter>
      <Navbar/>
      <Switch>
      <Route path="/register" exact component={register} />
      <Route path="/home" exact component={home} />
      <Route path="/login" exact component={login} data="meow"/>
      <Route path='/test' render={(props) => <Test {...props} data="meow" />}/>
      <Route path="/dashboard" exact component={Dashboard} />
      </Switch>
      </BrowserRouter>

    </div>
  );
}

}


export default App;
