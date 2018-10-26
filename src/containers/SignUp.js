import React, { Component } from 'react'

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: ''
    }
  }

  handleOnChange = (e) => {
    console.log(this.state)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleOnSubmit = (e) => {
    e.preventDefault()
    this.props.handleSignUp(this.state, this.props.history)
  }

  render() {
      return (
        <div>
          <form onSubmit={this.handleOnSubmit}>
            <label>First Name</label>
              <input onChange={this.handleOnChange} type='text' name="first_name"></input>
            <label>Last Name</label>
              <input onChange={this.handleOnChange} type='text' name="last_name"></input>
            <label>E-mail</label>
              <input onChange={this.handleOnChange} type='text' name="email"></input>
            <label>Username</label>
              <input onChange={this.handleOnChange} type='text' name="username"></input>
            <label>Password</label>
              <input onChange={this.handleOnChange} type='text' name="password"></input>
            <button type='submit'>Sign Up</button>
          </form>
        </div>
      )
    }
  }

export default SignUp
