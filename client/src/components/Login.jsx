
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

    }
this.handleChange = this.handleChange.bind(this)
this.handleClick = this.handleClick.bind(this)
this.handleLogin = this.handleLogin.bind(this)
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

  handleLogin(){
    const { email, password} = this.state
    const data =
     {
      password: password,
      email: email
    }

    axios.post('/login', data)
    .then(data => console.log('User Registered'))
    .catch((err) => console.log('AXIOS POST ERROR', err))

    this.state.isLoggedIn = true
  }
  render(){


      return(
    <div>

    <h1>Login</h1>
    <div>

    </div>
    <form action='/login'  method="POST">
    <div>
      <label>Email</label>
      <input type='email' onChange={this.handleChange} id='email' name='email' value={this.state.email} required/>
    </div>
    <div>
      <label>Password</label>
      <input type='password' id='password' onChange={this.handleChange} name='password' value={this.state.password} required/>
    </div>
    <button  type="submit">Login</button>
    </form>




    </div>
        )

  }
}

export default Login