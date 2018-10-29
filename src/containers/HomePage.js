import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
      friends: [],
      pending: [],
      username: null,
      showExpenseForm: false
    }
    this.adapter = adapter
    this.token = token
    this.userId = userId
  }

  changeFriendAndPendingState = (newFriends, newPending) => {
    this.setState({ friends: newFriends, pending: newPending })
  }

  changePendingState = (newState) => {
    this.setState({ pending: newState })
  }

  componentDidMount() {
    if (this.userId !== null) {
      this.adapter.getUserData(this.token, this.userId)
      .then((res) => {
        this.setState({ firstName: res.first_name, username: res.username, lastName: res.lastName, expenses: res.expenses, friends: res.friends, pending: res.requested_friendships })
      })
    } else {
      createBrowserHistory().push('/home')
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
          <Switch>
            <Route exact path="/analytics" render={() => <Analytics expenses={this.state.expenses} />} />
            <Route exact path="/friends" render={() => <Friends username={this.state.username} changeFriendAndPendingState={this.changeFriendAndPendingState} changePendingState={this.changePendingState} token={this.token} adapter={this.adapter} userId={this.userId} friends={this.state.friends} pending={this.state.pending}/>} />
            <Route path="/home" render={() => <Home handleCreateExpense={this.handleCreateExpense} adapter={this.adapter} showExpenseForm={this.state.showExpenseForm} expenses={this.state.expenses} token={this.token} userId={this.userId} handleAddExpenseButton={this.handleAddExpenseButton}/>} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }

}
