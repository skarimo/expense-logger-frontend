import React from 'react'
import { Link } from 'react-router-dom'
// import { Form } from 'semantic-ui'

const LoginForm = (props) => {
    return (
      <div className="column">
          <h2 className="ui green image header">
            {/*<img src="assets/images/logo.png" className="image" />*/}
            <div className="content">
              Log-in to your account
            </div>
          </h2>
          <form className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input onChange={props.handleChange} type="text" name="email" placeholder="E-mail address" />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input onChange={props.handleChange} type="password" name="password" placeholder="Password" />
                </div>
              </div>
              <button onClick={(e) => props.handleLoginSubmit(e, props.history)} className="ui fluid large green submit button">Login</button>
            </div>

            <div className="ui error message"></div>

          </form>

          <div className="ui message">
            New to us? <Link to='/signup'>Sign Up</Link>
          </div>
        </div>
    )
  }

export default LoginForm
