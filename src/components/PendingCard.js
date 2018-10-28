import React from 'react'

const PendingCard = ({ pending, handleAcceptFriendRequest, handleRejectFriendRequest }) => {
  return (
  <div className="ui cards" style={{display:'inline-block', padding:'1%'}}>
    <div className="card">
      <div className="content">
        <div className="header">
          {pending.first_name}, {pending.last_name}
        </div>
        <div className="meta">
          {pending.username}
        </div>
        <div className="description">
          Elliot requested permission to view your contact details
        </div>
      </div>
      <div className="extra content">
        <div className="ui two buttons">
          <div onClick={() => handleAcceptFriendRequest(pending.id)} className="ui basic green button">Approve</div>
          <div onClick={() => handleRejectFriendRequest(pending.id)} className="ui basic red button">Decline</div>
        </div>
      </div>
    </div>
  </div>
  )
}


export default PendingCard
