
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
        // if you color this div it changes the words in login padding moves it from the left wall
    <div style={{alignSelf: 'center',

    }}>

    <h1>Login</h1>
    <div className='login'>


    <form action='/login'  method="POST">
    <div c >
      <label style={{
        padding: 10,
          }} >Email</label>
      <input style={{margin: 10}}type='email' onChange={this.handleChange} placeholder='Enter Email' id='email' name='email' value={this.state.email} required/>
    </div>
    <div>
      <label className='login' style={{padding: 10}}>Password</label>
      <input type='password' id='password' placeholder='Enter Password' onChange={this.handleChange} name='password' value={this.state.password} required/>
    </div>
    <button className='register' style={{

      marginTop: 10,
      marginLeft: 3
    }} type="submit">Login</button>
    </form>
</div>



    </div>
        )

  }
}

export default Login