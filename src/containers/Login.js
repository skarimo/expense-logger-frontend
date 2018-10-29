import React, { Component } from 'react'
import HomePage from './HomePage.js'
import LoginForm from '../components/LoginForm.js'
import SignUp from './SignUp.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';


export default class Login extends Component {
  constructor({ adapter }) {
    super()
    this.state = {
      email: '',
      password: '',
      userId: null,
      authenticated: false
    }
    this.adapter = adapter
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      this.adapter.existingTokenCheck(token)
      .then((res) => {
        if (res.user) {
          createBrowserHistory().push('/home')
          this.setState({ authenticated: true, userId: res.user.user_id})

        } else {
          localStorage.removeItem("token")
        }
      })
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleLoginSubmit = (e, history) => {
    e.preventDefault()
    const loginObj = {email: this.state.email, password: this.state.password}
    this.adapter.login(loginObj).then(res => {
      if (res.access_token) {
        localStorage.setItem("token", res.access_token)
        // history.push('/home')
        this.setState({ authenticated: true, userId: res.user.user_id })
        // history.push('/home')
      } else {
        alert("Invalid credentials please try again")
      }
    })
  }

  handleSignUp = (newUserInfo, history) => {
    this.adapter.register(newUserInfo).then((res)=>{
      if(res.message === "User created successfully") {
        history.push('/home')
      } else {
        let errorKeys = Object.keys(res).map((key) => `${key.split("_").join(" ")}: ${res[key]} `)
        alert(errorKeys)
      }
    })
  }

  indexPage = (props) => {
    return (this.state.authenticated ? (<HomePage adapter={this.adapter} token={localStorage.getItem("token")} userId={this.state.userId} />) : (< LoginForm history={props.history} adapter={this.adapter} handleLoginSubmit={this.handleLoginSubmit} handleChange={this.handleChange} />))
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
        <Switch>
          <Route exact path="/signup" render={(props) => <SignUp adapter={this.adapter} handleSignUp={this.handleSignUp} history={props.history} />} />
          <Route path="/" render={(props) => {return this.indexPage(props)}} />
        </Switch>
        </React.Fragment>
      </BrowserRouter>

    )
  }
}
