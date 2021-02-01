
import React from 'react'

const Login = () => {
  return(

<div>

<h1>Login</h1>
<div>

</div>
<form action='/login' method="POST">
<div>
  <label for='email'>Email</label>
  <input type='email' id='email' name='name' required/>
</div>
<div>
  <label for='password'>Password</label>
  <input type='password' id='password' name='password' required/>
</div>
<button type="submit">login</button>
</form>
<a href='/register'>Register</a>
</div>

  )
}

export default Login