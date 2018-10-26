import React from 'react'


const LoginForm = (props) => {
    return (
      <div>
        <form onSubmit={(e) => props.handleLoginSubmit(e, props.history)}>
          <label>E-mail</label>
            <input onChange={props.handleChange} type='text' name="email"></input>
          <label>Password</label>
            <input onChange={props.handleChange} type='text' name="password"></input>
          <button type='submit'>login</button>
        </form>
        <button onClick={() => props.history.push('/signup')} type='submit'>Sign Up</button>
      </div>
    )
  }

export default LoginForm
