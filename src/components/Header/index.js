import {Component} from 'react'
import {FiMenu} from 'react-icons/fi'
import './index.css'

class Header extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="logo-name-container">
          <img
            src="https://res.cloudinary.com/djdrrmpnu/image/upload/v1657008892/Frame_274-website-logo_wgabhl.png"
            alt="website logo"
            className="website-logo-header"
          />
          <h1 className="tasty-kitchens-heading-header">Tasty Kitchens</h1>
        </div>
        <FiMenu className="menu-icon" />
      </nav>
    )
  }
}

export default Header
