import React, { Component } from 'react'
import SignUpForm from '../components/SignUpForm'

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
    this.setState({ [e.target.name]: e.target.value })
  }

  handleOnSubmit = (e) => {
    e.preventDefault()
    this.props.handleSignUp(this.state, this.props.history)
  }

  render() {
      return (
        <SignUpForm handleOnChange={this.handleOnChange} handleOnSubmit={this.handleOnSubmit}/>
      )
    }


  }

export default SignUp
