import React from "react"
import Auxx from "../../hoc/Auxx"
import Burger from "../../component/Burger/Burger"
import BuildControls from "../../component/Burger/BuildControls/BuildControls"

const BurgerBuilder = props => {
  const ingredients = {
    salad: 1,
    bacon: 1,
    cheese: 9,
    meat: 2
  }
  return (
    <Auxx>
      <Burger ingredients={ingredients} />
      <BuildControls />
    </Auxx>
  )
}

export default BurgerBuilder
