
import React from 'react';
import axios from 'axios';

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      member: false,
    username: '',
    email: '',
    password: ''
    }
this.handleChange = this.handleChange.bind(this)
this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event){
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    })
  }
  handleSubmit(){
    const {name, email, password} = this.state
    const data =
     { username: username,
      password: password,
      email: email
    }
    axios.post('/', data)
    .then(data => console.log('User Registered'))
    .catch((err) => console.log('AXIOS POST ERROR', err))
  }
  render(){
const { member } = this.state;
    if(member){

      return(
    <div>

    <h1>Login</h1>
    <div>

    </div>
    <form action='/login' onSubmit={this.handleSubmit} method="POST">
    <div>
      <label>Email</label>
      <input type='email' onChange={this.handleChange} id='email' name='email' value={this.state.email} required/>
    </div>
    <div>
      <label>Password</label>
      <input type='password' id='password' onChange={this.handleChange} name='password' value={this.state.password} required/>
    </div>
    <button onClick={this.handleSubmit} type="submit">login</button>
    </form>

    </div>

      )
    }else {
      return(
        <div>

        <h1>Register</h1>

        <form action='/' method="POST">
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

        )
    }
  }
}

export default Login