import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import {MdOutlineSort} from 'react-icons/md'
import Header from '../Header'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {data: [], show: false}

  componentDidMount() {
    this.getCarouselImages()
    this.getRestaurantList()
  }

  getCarouselImages = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      const {offers} = data
      const updatedData = offers.map(each => ({
        imageUrl: each.image_url,
      }))
      this.setState({data: updatedData, show: true})
    }
  }

  getRestaurantList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const offset = 0
    const limit = 10
    const response = await fetch(
      `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}`,
      options,
    )
    const data = await response.json()
    console.log(data)
  }

  renderCarousel = () => {
    const {data} = this.state
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 1000,
      dotsClass: 'slick-dots',
    }
    return (
      <div className="slider-container">
        <Slider {...settings} className="slick-slider">
          {data.map(each => (
            <img
              key={each.imageUrl}
              src={each.imageUrl}
              alt="offers-img"
              className="offers-img"
            />
          ))}
        </Slider>
      </div>
    )
  }

  render() {
    const {show} = this.state
    return (
      <div>
        <Header />
        {show && this.renderCarousel()}
        <div className="home-content-container">
          <h1 className="popular-heading">Popular Restaurants</h1>
          <p className="home-tag">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="sort-by-container">
            <MdOutlineSort className="sort-icon" />
            <select className="select-input">
              {sortByOptions.map(each => (
                <option value={each.value} key={each.id}>
                  Sort By {each.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
