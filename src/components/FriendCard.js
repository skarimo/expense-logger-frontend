import React, { Component } from 'react'

class FriendCard extends Component {
  constructor({ adapter, userId, token }) {
    super()
    this.state = {
      user_bill_share: [],
      friend_bill_share: [],
      amount_to_add: ''
    }
    this.adapter = adapter
    this.token = token
    this.userId = userId
  }

  componentDidMount() {
    this.adapter.getBillShares(this.token, this.userId, {"user_id": this.userId, "friend_id": this.props.friend.id})
    .then((res) => {
      let user_bill_share = res.filter(bill_share => bill_share.user_id === this.userId)
      let friend_bill_share = res.filter(bill_share => bill_share.user_id !== this.userId)
      this.setState({ user_bill_share, friend_bill_share })
    })
  }

  getAmountBetweenUsers = () => {
    let userTotal = this.state.user_bill_share.reduce(function (acc, bill_share) {
      return acc + bill_share.amount;
    }, 0);
    let friendTotal = this.state.friend_bill_share.reduce(function (acc, bill_share) {
      return acc + bill_share.amount;
    }, 0);
    return (<React.Fragment> Your Spending: ${parseFloat(userTotal)} <h3>${(userTotal - friendTotal).toFixed(2)}</h3> Friends Spending: ${parseFloat(friendTotal)} </React.Fragment>)
  }

  handleAddAmountChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleOnAddAmountSubmit = () => {
    const bill_share = this.state.user_bill_share[0].id
    this.adapter.updateBillShares(this.token, this.userId, {bill_share: bill_share,amount_to_add: this.state.amount_to_add})
    .then(res => this.setState({ user_bill_share: [res], amount_to_add: '' }))
  }


  render() {
    return (
      <div className="ui cards" style={{display:'inline-block', padding:'1%'}}>
        <div className="card">
          <div className="content">
            <div className="header">
              {this.props.friend.first_name}, {this.props.friend.last_name}
            </div>
            <div className="meta">
              {this.props.friend.username}
            </div>
            <div className="description">
              {this.getAmountBetweenUsers()}
            </div>
          </div>
          <div className="extra content">
            <div className="ui input" style={{paddingBottom: '2%'}}>
              <input onChange={this.handleAddAmountChange} value={this.state.amount_to_add} name="amount_to_add" type="number" placeholder="Enter an amount to add"/>
            </div>
            <div onClick={this.handleOnAddAmountSubmit} className="ui bottom attached button green">
               <i className="add icon"></i>
               Add Amount
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FriendCard
