import React from "react"
import Auxx from "../../hoc/Auxx"
import Burger from "../../component/Burger/Burger"

const BurgerBuilder = props => {
  const ingredients = {
    salad: 1,
    bacon: 1,
    cheese: 7,
    meat: 2
  }
  return (
    <Auxx>
      <Burger ingredients={ingredients} />
    </Auxx>
  )
}

export default BurgerBuilder
