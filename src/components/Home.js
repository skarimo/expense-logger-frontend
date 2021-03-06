import React from 'react'
import AddExpenseForm from './AddExpenseForm'

const Home = ({ expenses, showExpenseForm, handleAddExpenseButton, handleCreateExpense, adapter, token, userId }) => {
  const expenseList = expenses.reverse().map((expense) => (
    <tr key={expense.id}>
    <td>{expense.category.name}</td>
    <td>${expense.total_amount}</td>
    <td>{expense.date}</td>
    </tr>
  )
)

  return (
    <div style={{width:'100%'}}>
      <h3 className="ui block header">List of Expenses</h3>
      <button onClick={handleAddExpenseButton} className="ui inverted green button" style={{marginBottom: '8px'}}>Add an Expense</button>
        {showExpenseForm ? < AddExpenseForm token={token} userId={userId} adapter={adapter} handleCreateExpense={handleCreateExpense}/> : null}
      <table style={{width:'90%', margin: "auto"}} className="ui inverted teal celled striped table">
        <thead>
      <tr key="tr-title-spending">
        <th>Category</th>
        <th>Amount spent</th>
        <th>Date</th>
      </tr>
        </thead>
        <tbody>
          {expenseList}
        </tbody>
      </table>
    </div>
  )
}


export default Home
