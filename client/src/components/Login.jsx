
import React from 'react';
import axios from 'axios';

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      member: false

    }
this.handleChange = this.handleChange.bind(this)
this.handleClick = this.handleClick.bind(this)
  }
  handleChange(){
    this.setState({member: true})
  }
  handleClick(){
    console.log({email, password})
  }
  render(){
const { member } = this.state;
    if(member){

      return(
    <div>

    <h1>Login</h1>
    <div>

    </div>
    <form action='/login' onSubmit={this.handleClick} method="POST">
    <div>
      <label>Email</label>
      <input type='email' id='email' name='name' required/>
    </div>
    <div>
      <label>Password</label>
      <input type='password' id='password' name='password' required/>
    </div>
    <button onClick="handleClick" type="submit">login</button>
    </form>

    </div>

      )
    }else {
      return(
        <div>

        <h1>Register</h1>

        <form action='/login' method="POST">
        <div>
          <label>Name</label>
          <input type='text' id='name' name='name' required/>
        </div>
        <div>
          <label>Email</label>
          <input type='email' id='email' name='name' required/>
        </div>
        <div>
          <label>Password</label>
          <input type='password' id='password' name='password' required/>
        </div>
        <button type="submit">Register</button>
        </form>

        </div>

        )
    }
  }
}

export default Login