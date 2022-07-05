import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FiMenu} from 'react-icons/fi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {showMenu: false}

  toggleMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  renderMenuList = () => (
    <div className="menu-container">
      <ul className="menu-list">
        <li>
          <Link to="/">
            <button type="button" className="home-btn">
              Home
            </button>
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <button type="button" className="home-btn">
              Cart
            </button>
          </Link>
        </li>
        <li>
          <button type="button" className="logout-btn">
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
            <img
              src="https://res.cloudinary.com/djdrrmpnu/image/upload/v1657008892/Frame_274-website-logo_wgabhl.png"
              alt="website logo"
              className="website-logo-header"
            />
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

export default Header
