import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <React.Fragment>
      <div className="ui green inverted menu">
        <Link to='/home' className="item">
          <i className="home icon"></i> Home
        </Link>
        <Link to='/analytics' className="item">
          <i className="pie chart icon"></i> Analytics
        </Link>
        <Link to='/friends' className="item">
          <i className="tasks icon"></i> Friends
        </Link>
      </div>
    </React.Fragment>
  )
}

export default NavBar
