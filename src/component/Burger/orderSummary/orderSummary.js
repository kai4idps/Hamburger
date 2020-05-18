import React from "react"
import Aux from "../../../hoc/Auxx"
import Button from "../../UI/Button/Button"

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(key => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}:</span>
        {props.ingredients[key]}
      </li>
    )
  })
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>detail </p>
      <ul>{ingredientSummary}</ul>
      <h1>Totalprice:{props.price.toFixed(2)}元</h1>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>
        cancel
      </Button>
      <Button btnType="Success" clicked={props.purchasingContinued}>
        continue
      </Button>
    </Aux>
  )
}

export default orderSummary
