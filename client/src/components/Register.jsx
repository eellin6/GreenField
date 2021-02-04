import React from 'react'
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
    axios.post("/register", data)
    .then(this.setState({view: 'maps'}))
    .catch((err) => console.log('AXIOS POST ERROR', err))
    this.state.isLoggedIn = true
  }
  render(){
      return(
    <div>
        <div>
        <h1>Register</h1>
        <form  action="/register" method='POST'>
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
        <button type='submit' >Register</button>
        </form>
        </div>
    </div>
        )
  }
}
export default Register