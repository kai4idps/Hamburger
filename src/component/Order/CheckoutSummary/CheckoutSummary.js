import React from "react"
import Burger from "../../Burger/Burger"
import Button from "../../UI/Button/Button"
import classes from "./CheckoutSummary.module.css"

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hope u like it</h1>
      <div style={{ width: "300px", height: "300px", margin: "auto " }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE{" "}
      </Button>
    </div>
  )
}

export default CheckoutSummary
