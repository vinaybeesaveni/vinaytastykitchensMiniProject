import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errMsg: '', showError: false}

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errMsg: errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userData = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errMsg, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="bg-container" />
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <img
            src="https://res.cloudinary.com/djdrrmpnu/image/upload/v1657008892/Frame_274-website-logo_wgabhl.png"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="tasty-kitchens-heading">Tasty Kitchens</h1>
          <h2 className="login-heading">Login</h2>
          <div className="input-container">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              type="text"
              className="form-input"
              id="username"
              value={username}
              onChange={this.onUsernameChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              className="form-input"
              id="password"
              value={password}
              onChange={this.onPasswordChange}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {showError && <p className="error-msg">{errMsg}</p>}
        </form>
        <img
          src="https://res.cloudinary.com/djdrrmpnu/image/upload/v1657009287/Rectangle_1456-login-lg-img_lhxbfb.png"
          alt="website login"
          className="website-login-img"
        />
      </div>
    )
  }
}

export default Login
