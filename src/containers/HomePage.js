import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from '../components/NavBar.js'
import Home from '../components/Home.js'
import Analytics from '../components/Analytics.js'
import Friends from '../components/Friends.js'
import { createBrowserHistory } from 'history'

export default class HomePage extends Component {
  constructor({ adapter, token, userId }) {
    super()
    this.state={
      firstName: null,
      lastName: null,
      expenses: [],
      showExpenseForm: false
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

  handleCreateExpense = (expenseObj) => {
    this.adapter.createExpense(this.token, expenseObj)
    .then((res) => {
      if (res.errors == null) {
        let newExpenses = [...this.state.expenses]
          newExpenses.push(res)
        this.setState({
          expenses: newExpenses,
          showExpenseForm: false
        })
      }
    })
  }

  handleAddExpenseButton = (e) => {
    this.setState({ showExpenseForm: !this.state.showExpenseForm})
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
        < NavBar />
            <Route exact path="/analytics" render={() => <Analytics expenses={this.state.expenses} />} />
            <Route exact path="/friends" render={() => <Friends />} />
            <Route path="/home" render={() => <Home handleCreateExpense={this.handleCreateExpense} adapter={this.adapter} showExpenseForm={this.state.showExpenseForm} expenses={this.state.expenses} token={this.token} userId={this.userId} handleAddExpenseButton={this.handleAddExpenseButton}/>} />
        </React.Fragment>
      </BrowserRouter>
    )
  }

}
