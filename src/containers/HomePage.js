import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from '../components/NavBar.js'
import Home from '../components/Home.js'
import Analytics from '../components/Analytics.js'
import Budgeting from '../components/Budgeting.js'
import { createBrowserHistory } from 'history'

export default class HomePage extends Component {
  constructor({ adapter, token, userId }) {
    super()
    this.state={
      firstName: null,
      lastName: null,
      expenses: []
    }
    this.adapter = adapter
    this.token = token
    this.userId = userId
  }

  componentDidMount() {
    if (this.userId !== null) {
      this.adapter.getUserData(this.token, this.userId)
      .then((res) => {
        this.setState({ firstName: res.first_name, lastName: res.lastName, expenses: res.expenses })
      })
    } else {
      createBrowserHistory().push('/')
    }
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
        < NavBar />
            <Route exact path="/analytics" render={() => <Analytics expenses={this.state.expenses} />} />
            <Route exact path="/budgeting" render={() => <Budgeting />} />
            <Route path="/home" render={() => <Home expenses={this.state.expenses}/>} />
        </React.Fragment>
      </BrowserRouter>
    )
  }

}
