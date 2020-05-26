import React from "react"

import classes from "./NavigationItems.module.css"
import NavigationItem from "./NavigationItem/NavigationItem"

const navigationItems = props => {
  console.log(props)

  return (
    <div>
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
          Burger Builder
        </NavigationItem>
        {props.isAuthenticated ? (
          <NavigationItem link="/orders">Orders</NavigationItem>
        ) : null}
        {!props.isAuthenticated ? (
          <NavigationItem link="/auth">Authenticate</NavigationItem>
        ) : (
          <NavigationItem link="/logout">test</NavigationItem>
        )}
      </ul>
    </div>
  )
}

export default navigationItems
