import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiMenu} from 'react-icons/fi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {showMenu: false}

  toggleMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  onClickingLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  renderMenuList = () => (
    <div className="menu-container">
      <ul className="menu-list">
        <li key="home">
          <Link to="/">
            <button type="button" className="home-btn">
              Home
            </button>
          </Link>
        </li>
        <li key="cart">
          <Link to="/cart">
            <button type="button" className="home-btn">
              Cart
            </button>
          </Link>
        </li>
        <li key="logout">
          <button
            type="button"
            className="logout-btn"
            onClick={this.onClickingLogout}
          >
            Logout
          </button>
        </li>
      </ul>
      <AiFillCloseCircle className="close-icon" onClick={this.toggleMenu} />
    </div>
  )

  render() {
    const {showMenu} = this.state
    return (
      <>
        <nav className="navbar">
          <div className="logo-name-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/djdrrmpnu/image/upload/v1657008892/Frame_274-website-logo_wgabhl.png"
                alt="website logo"
                className="website-logo-header"
              />
            </Link>
            <h1 className="tasty-kitchens-heading-header">Tasty Kitchens</h1>
          </div>
          <button className="menu-btn" type="button">
            <FiMenu className="menu-icon" onClick={this.toggleMenu} />
          </button>
        </nav>
        {showMenu && this.renderMenuList()}
      </>
    )
  }
}

export default withRouter(Header)
