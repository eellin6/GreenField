import React from 'react';
import axios from 'axios';

class Register extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      member: false,
    username: '',
    email: '',
    password: '',

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

    this.state.isLoggedIn = true
  }
register(){
  const {username, password} = this.state
  axios({
    method: "post",
    data: {
      username: username,
      password: password
    },
    withCredentials: true,
    url: "http://localhost:3000/register"
  }).then((res) => console.log(res))
}
  render(){


      return(
    <div>
        <h1>Register</h1>
        <input placeholder='username'
        onChange={this.handleChange}
        />
        <input placeholder='password'
        onChange={this.handleChange}
        />
        <button>Submit</button>


    </div>
        )

  }
}

export default Register