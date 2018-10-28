import React, { Component } from 'react'
import FriendCard from './FriendCard'
import PendingCard from './PendingCard'

class Friends extends Component {
  constructor({ adapter, userId, token }) {
    super()
    this.state = {
      // user_id: null,
      friends: [],
      pending: [],
      friend_username: ''
    }
    this.adapter = adapter
    this.userId = userId
    this.token = token
  }

  componentDidMount() {
    this.setState({ friends: this.props.friends, pending:this.props.pending})
  }

  handleUsernameInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleAddFriendSubmit = () => {
    this.adapter.addFriendRequest(this.token,this.userId, {username: this.state.friend_username})
    .then((res) => {
      if (res.errors == null) {
        alert('Request sent')
      } else {
        alert('Invalid username try again: '  + res.errors)
      }
    })
  }

  handleAcceptFriendRequest = (friend_id) => {
    this.adapter.acceptFriendRequest(this.token, this.userId, {user_id: this.userId, friend_id: friend_id})
    .then(res => this.props.changeFriendAndPendingState(res.friends, res.pending))
  }

  handleRejectFriendRequest = (friend_id) => {
    this.adapter.rejectFriendRequest(this.token, this.userId, {user_id: this.userId, friend_id: friend_id}).then(res => this.props.changePendingState(res.pending)
  }

  render() {
    const friendsCards = this.state.friends.map(friend => <FriendCard adapter={this.adapter} token={this.token} key={friend.id} userId={this.userId} friend={friend} />)

    const pendingCards = this.state.pending.map(pending => <PendingCard key={pending.id} pending={pending} handleAcceptFriendRequest={this.handleAcceptFriendRequest} handleRejectFriendRequest={this.handleRejectFriendRequest}/>)

    return (
      <div>
        <div style={{width:'100%'}}>
          <h3 className="ui block header">Friends</h3>
        </div>
        <div>
        <div className="ui input">
          <input onChange={this.handleUsernameInputChange} name="friend_username" type="text" placeholder="Enter username" />
        </div>
          <button onClick={this.handleAddFriendSubmit} className="ui blue button" style={{marginTop: '0.7%'}}>Add a friend</button>
        </div>
          <div className='centered grid'>
            {friendsCards}
          </div>

          <div style={{width:'100%', paddingTop:'2%'}}>
            <h3 className="ui block header inverted header">Friend Requests</h3>
          </div>
          <div className='centered grid'>
            {pendingCards}
          </div>
      </div>
    )
  }
}

export default Friends
