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
        <div className='register'>
        <h1 className='register'>Register</h1>
        <form  action="/register" method='POST'>
        <div>
          <label style={{padding: 10}}>Username</label>
          <input value={this.state.username}type='text' placeholder='Enter Username' id='name' onChange={this.handleChange} name='username' required/>
        </div>
        <div>
          <label style={
            {
              padding: 10,

            }}>Email</label>
          {/* padding the input makes it bigger from top to bottom
            flex makes the input box go below the label
            margin seperates the input boxes from top to bottom
          */}
          <input style={{
              margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10
            }}type='email' placeholder='Enter Email' id='email' name='email' onChange={this.handleChange} value={this.state.email}required/>
        </div>
        <div>
          <label style={{padding: 10}}>Password</label>
          <input type='password' id='password' placeholder='Enter Password' onChange={this.handleChange} name='password' value={this.state.password}required/>
        </div>
        <button style={{
          margin: 10,
          justifyContent: 'center'
        }}type='submit' >Register</button>
        </form>
        </div>
    </div>
        )
  }
}
export default Register