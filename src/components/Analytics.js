import React from 'react'
import { PieChart } from 'react-chartkick'

const Analytics = ({ expenses }) => {
  const spendingList = categorySpending(expenses).map((category) => (
    <tr key={Object.keys(category)}>
    <td>{Object.keys(category)}</td>
    <td>${Object.values(category)}</td>
    </tr>
    )
  )

  const categorySum = categorySpending(expenses).reduce(function (accumulator, currentValue) {
    return accumulator + parseInt(Object.values(currentValue));
  },0)

  const chartData = categorySpending(expenses).map((category) => (
    [[Object.keys(category)], Object.values(category)/categorySum*100]
    )
  )

  return (
    <div style={{width:'100%'}}>
      <h3 className="ui block header">Expense Analytics</h3>
      <table style={{width:'90%', margin: "auto"}} className="ui inverted teal celled striped table">
        <thead>
      <tr key="tr-title-spending">
        <th>Category</th>
        <th>Amount spent</th>
      </tr>
        </thead>
        <tbody>
          {spendingList}
        </tbody>
      </table>
      <PieChart data={chartData} width='100%' library={{backgroundColor: 'transparent'}}/>
    </div>
  )
}




function categorySpending(expenses) {
  let grouped = expenses.reduce((h, a) => Object.assign(h, { [a.category.name]:( h[a.category.name] || [] ).concat(a) }), {})
  let arr = []
  for (var category in grouped) {
    const sum = grouped[category].reduce(function (accumulator, currentValue) {
      return accumulator + parseInt(currentValue.total_amount);
    },0)
    arr.push({[category]: sum})
  }
  return arr
}

export default Analytics
