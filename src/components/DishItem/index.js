import './index.css'

const DishItem = props => {
  const {dish, quantity, increaseDish, decreaseDish} = props

  const isVeg = dish.dish_Type === 2

  const onClickIncrement = () => increaseDish(dish.dish_id)
  const onClickDecrement = () => decreaseDish(dish.dish_id)

  return (
    <li className="dish-item-container">
      <div className="dish-left">
        <div className={`dish-type-mark ${isVeg ? 'veg' : 'non-veg'}`}>
          <div className="mark-circle" />
        </div>

        <div className="dish-details-container">
          <h1 className="dish-name">{dish.dish_name}</h1>

          <p className="dish-currency-price">
            {dish.dish_currency} {dish.dish_price}
          </p>

          <p className="dish-description">{dish.dish_description}</p>

          {dish.dish_Availability ? (
            <div className="quantity-container">
              <button
                type="button"
                className="control-btn"
                onClick={onClickDecrement}
              >
                -
              </button>

              <p className="quantity">{quantity}</p>

              <button
                type="button"
                className="control-btn"
                onClick={onClickIncrement}
              >
                +
              </button>
            </div>
          ) : (
            <p className="not-available-text">Not available</p>
          )}

          {dish.addonCat.length > 0 && (
            <p className="addon-availability-text">Customizations available</p>
          )}
        </div>
      </div>

      <p className="dish-calories">{dish.dish_calories} calories</p>

      <img src={dish.dish_image} alt={dish.dish_name} className="dish-image" />
    </li>
  )
}

export default DishItem
