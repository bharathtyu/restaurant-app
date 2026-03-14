import './index.css'

const CategoryTabs = ({menuList, activeTabId, changeTab}) => (
  <div className="tabs">
    {menuList.map(each => (
      <button
        type="button"
        key={each.menu_category_id}
        className={activeTabId === each.menu_category_id ? 'active-tab' : ''}
        onClick={() => changeTab(each.menu_category_id)}
      >
        {each.menu_category}
      </button>
    ))}
  </div>
)

export default CategoryTabs
