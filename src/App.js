import {Component} from 'react'
import Header from './components/Header'
import CategoryTabs from './components/CategoryTabs'
import DishItem from './components/DishItem'
import './App.css'

const dishesApiUrl =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

class App extends Component {
  state = {
    restaurantName: '',
    menuList: [],
    activeTabId: '',
    quantities: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getMenuItems()
  }

  getMenuItems = async () => {
    const response = await fetch(dishesApiUrl)
    const data = await response.json()
    const restaurantData = data[0]

    const initialQuantities = {}
    restaurantData.table_menu_list.forEach(category => {
      category.category_dishes.forEach(dish => {
        initialQuantities[dish.dish_id] = 0
      })
    })

    this.setState({
      restaurantName: restaurantData.restaurant_name,
      menuList: restaurantData.table_menu_list,
      activeTabId: restaurantData.table_menu_list[0].menu_category_id,
      quantities: initialQuantities,
      isLoading: false,
    })
  }

  changeTab = id => {
    this.setState({activeTabId: id})
  }

  increaseDish = id => {
    this.setState(prevState => ({
      quantities: {
        ...prevState.quantities,
        [id]: prevState.quantities[id] + 1,
      },
    }))
  }

  decreaseDish = id => {
    this.setState(prevState => ({
      quantities: {
        ...prevState.quantities,
        [id]: prevState.quantities[id] > 0 ? prevState.quantities[id] - 1 : 0,
      },
    }))
  }

  getCartCount = () => {
    const {quantities} = this.state
    return Object.values(quantities).reduce((a, b) => a + b, 0)
  }

  render() {
    const {restaurantName, menuList, activeTabId, quantities, isLoading} =
      this.state

    if (isLoading) {
      return null
    }

    const activeCategory = menuList.find(
      each => each.menu_category_id === activeTabId,
    )

    const dishes = activeCategory ? activeCategory.category_dishes : []

    return (
      <div className='app-container'>
        <Header
          restaurantName={restaurantName}
          cartCount={this.getCartCount()}
        />

        <CategoryTabs
          menuList={menuList}
          activeTabId={activeTabId}
          changeTab={this.changeTab}
        />

        <ul className='dishes-list'>
          {dishes.map(dish => (
            <DishItem
              key={dish.dish_id}
              dish={dish}
              quantity={quantities[dish.dish_id]}
              increaseDish={this.increaseDish}
              decreaseDish={this.decreaseDish}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default App
