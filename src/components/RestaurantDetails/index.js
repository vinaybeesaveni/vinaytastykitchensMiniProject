import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class RestaurantDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, data: {}}

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/restaurants-list/${id}`,
      options,
    )
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = {
        costForTwo: data.const_for_two,
        cuisine: data.cuisine,
        foodItem: data.foodItems,
        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }
      this.setState({data: updatedData, apiStatus: apiStatusConstants.success})
    }
  }

  renderSuccessView = () => {
    const {data} = this.state
    const myStyle = {
      backgroundImage: `url(${data.imageUrl})`,
      height: '200px',
      width: '100%',
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      paddingRight: '30px',
    }
    return (
      <div style={myStyle}>
        <p className="restaurant-name">{data.name}</p>
        <p className="location">{data.location}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container-restaurant">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="black" height="50" width="50" />
      </div>
    </div>
  )

  renderDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderDetails()}
      </div>
    )
  }
}

export default RestaurantDetails
