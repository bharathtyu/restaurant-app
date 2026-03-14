import './index.css'

const Header = ({restaurantName, cartCount}) => (
  <div className="header">
    <h2>{restaurantName}</h2>

    <div className="cart">
      <p>My Orders</p>
      <div className="cart-icon">
        🛒
        <span className="cart-count">{cartCount}</span>
      </div>
    </div>
  </div>
)

export default Header
