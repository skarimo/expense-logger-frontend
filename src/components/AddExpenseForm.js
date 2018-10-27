import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import { Form } from 'semantic-ui'

class AddExpenseForm extends Component {
  constructor({ adapter, token, userId }) {
    super()
    this.state={
      category_id: 1,
      user_id: userId,
      total_amount: null,
      date: null,
      categories: []
    }
    this.adapter = adapter
    this.token = token
  }

  componentDidMount() {
    this.adapter.getCategories(this.token).then((categories) => this.setState({ categories }))
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleOnSubmit = (e) => {
    e.preventDefault()
    this.props.handleCreateExpense(this.state)
  }

  render() {
    const options = this.state.categories.map(category => (<option key={category.id} value={category.id}>{category.name}</option>))

    return (
      <form onSubmit={this.handleOnSubmit} className="ui form">
        <div className="field">
          <label>Total Amount</label>
          <input onChange={this.handleOnChange} type="number" name="total_amount" placeholder="Total Amount" />
        </div>

        <div className="field">
          <label>Date</label>
          <input onChange={this.handleOnChange} type="date" name="date" />
        </div>

        <div className="field">
          <label>Category</label>
          <select onChange={this.handleOnChange} name="category_id" className="ui dropdown">
            {options}
          </select>
        </div>

        <button className="ui button" type="submit" style={{marginBottom: '8px', marginTop: '8px'}}>Submit</button>
      </form>
    )
  }

}

export default AddExpenseForm
