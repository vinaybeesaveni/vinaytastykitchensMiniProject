import {FaPinterestSquare} from 'react-icons/fa'
import {BsInstagram, BsTwitter} from 'react-icons/bs'
import {ImFacebook2} from 'react-icons/im'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-logo-container">
        <img
          src="https://res.cloudinary.com/djdrrmpnu/image/upload/v1657029933/Frame_275-website-footer-logo_qy84uw.png"
          alt="website-logo"
          className="tasty-kitchens-logo-footer"
        />
        <h1 className="tasty-kitchens-heading-footer">Tasty Kitchens </h1>
      </div>
      <p className="contact-us-para">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="social-media-icons-container">
        <FaPinterestSquare className="social-media-icon" />
        <BsInstagram className="social-media-icon" />
        <BsTwitter className="social-media-icon" />
        <ImFacebook2 className="social-media-icon" />
      </div>
    </div>
  )
}
