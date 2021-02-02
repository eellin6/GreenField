
import React from 'react';
import axios from 'axios';

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      member: false,
    username: '',
    email: '',
    password: '',
    loginEmail: '',
    loginPassword: ''
    }
this.handleChange = this.handleChange.bind(this)
this.handleSubmit = this.handleSubmit.bind(this)
this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    this.setState({member: true})
  }
  handleChange(event){
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    })
  }
  handleSubmit(){
    const {username, email, password} = this.state
    const data =
     { username: username,
      password: password,
      email: email
    }
    axios.post('/register', data)
    .then(data => console.log('User Registered'))
    .catch((err) => console.log('AXIOS POST ERROR', err))
  }
  handleLogin(){
    const { loginEmail, loginPassword} = this.state
    const data =
     {
      password: loginPassword,
      email: loginEmail
    }
    axios.post('/login', data)
    .then(data => console.log('User Registered'))
    .catch((err) => console.log('AXIOS POST ERROR', err))
  }
  render(){


      return(
    <div>

    <h1>Login</h1>
    <div>

    </div>
    <form action='/login' onSubmit={this.handleLogin} method="POST">
    <div>
      <label>Email</label>
      <input type='email' onChange={this.handleChange} id='loginEmail' name='loginEmail' value={this.state.loginEmail} required/>
    </div>
    <div>
      <label>Password</label>
      <input type='password' id='loginPassword' onChange={this.handleChange} name='loginPassword' value={this.state.loginPassword} required/>
    </div>
    <button onClick={this.handleLogin} type="submit">Login</button>
    </form>


        <div>

        <h1>Register</h1>

        <form action='/register' method="POST">
        <div>
          <label>Name</label>
          <input value={this.state.username}type='text' id='name' onChange={this.handleChange} name='username' required/>
        </div>
        <div>
          <label>Email</label>
          <input type='email' id='email' name='email' onChange={this.handleChange} value={this.state.email}required/>
        </div>
        <div>
          <label>Password</label>
          <input type='password' id='password' onChange={this.handleChange} name='password' value={this.state.password}required/>
        </div>
        <button type="submit" onClick={this.handleSubmit}>Register</button>
        </form>

        </div>

    </div>
        )

  }
}

export default Login