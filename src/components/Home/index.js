import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import {MdOutlineSort} from 'react-icons/md'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {id: 1, displayText: 'Random', value: ''},
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    data: [],
    offset: 1,
    restaurantList: [],
    apiStatus: apiStatusConstants.initial,
    noOfPages: 1,
    sortBy: sortByOptions[0].value,
    apiRestaurantStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCarouselImages()
    this.getRestaurantList()
  }

  getCarouselImages = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
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
      this.setState({data: updatedData, apiStatus: apiStatusConstants.success})
    }
  }

  getRestaurantList = async () => {
    this.setState({apiRestaurantStatus: apiStatusConstants.loading})
    const {sortBy} = this.state
    const {offset} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const limit = 10
    const currentOffset = (offset - 1) * limit
    const response = await fetch(
      `https://apis.ccbp.in/restaurants-list?offset=${currentOffset}&limit=${limit}&sort_by_rating=${sortBy}`,
      options,
    )
    const data = await response.json()
    if (response.ok === true) {
      const {restaurants, total} = data
      const pages = Math.ceil(total / limit)
      const updatedData = restaurants.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
        userRating: each.user_rating,
        menuType: each.menu_type,
      }))
      this.setState({
        restaurantList: updatedData,
        apiRestaurantStatus: apiStatusConstants.success,
        noOfPages: pages,
      })
    }
  }

  onClickingBack = () => {
    this.setState(
      prevState => ({offset: prevState.offset - 1}),
      this.getRestaurantList,
    )
  }

  onClickingForward = () => {
    this.setState(
      prevState => ({offset: prevState.offset + 1}),
      this.getRestaurantList,
    )
  }

  onSortByChange = event => {
    this.setState({sortBy: event.target.value}, this.getRestaurantList)
  }

  renderCarouselSuccessView = () => {
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
              src={each.imageUrl}
              alt="offers-img"
              className="offers-img"
              key={each.imageUrl}
            />
          ))}
        </Slider>
      </div>
    )
  }

  renderSuccessView = () => {
    const {restaurantList} = this.state
    return (
      <ul className="restaurant-list">
        {restaurantList.map(each => (
          <li key={each.name}>
            <Link
              to={`/restaurant/${each.id}`}
              className="restaurant-list-item"
            >
              <div className="image-container">
                <img
                  src={each.imageUrl}
                  alt={each.title}
                  className="restaurant-img"
                />
              </div>
              <div className="restaurant-details-container">
                <p className="name">{each.name}</p>
                <p className="menu-type">{each.menuType}</p>
                <div className="ratings-container">
                  <BsFillStarFill className="rating-icon" />
                  <p className="rating">
                    {each.userRating.rating}
                    <span className="total-reviews">
                      ({each.userRating.total_reviews})
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="black" height="50" width="50" />
      </div>
    </div>
  )

  renderRestaurantListView = () => {
    const {apiRestaurantStatus} = this.state
    switch (apiRestaurantStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderCarousel = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCarouselSuccessView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {offset, noOfPages, sortBy} = this.state
    return (
      <div>
        <Header />
        {this.renderCarousel()}
        <div className="home-content-container">
          <h1 className="popular-heading">Popular Restaurants</h1>
          <p className="home-tag">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="sort-by-container">
            <MdOutlineSort className="sort-icon" />
            <select
              className="select-input"
              value={sortBy}
              onChange={this.onSortByChange}
            >
              {sortByOptions.map(each => (
                <option value={each.value} key={each.id}>
                  Sort By {each.displayText}
                </option>
              ))}
            </select>
          </div>
          {this.renderRestaurantListView()}
          <div className="pagination-container">
            <button
              className="back-btn"
              type="button"
              disabled={offset === 1}
              onClick={this.onClickingBack}
            >
              <i className="back-arrow">
                <IoIosArrowBack />
              </i>
            </button>
            <p className="page-number">
              {offset} of {noOfPages}
            </p>
            <button
              className="back-btn"
              type="button"
              disabled={noOfPages === offset}
              onClick={this.onClickingForward}
            >
              <i className="back-arrow">
                <IoIosArrowForward />
              </i>
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
