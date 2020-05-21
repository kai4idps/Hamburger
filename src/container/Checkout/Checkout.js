import React, { useState, useEffect } from "react"
import { Route } from "react-router-dom"

import CheckoutSummary from "../../component/Order/CheckoutSummary/CheckoutSummary"
import ContactData from "./ContactData/ContactData"

const Checkout = props => {
  console.log(props)

  const ingredients = { salad: 1, meat: 0, cheese: 0, bacon: 0 }
  const [ingredient, setIngredient] = useState(ingredients)
  const [price, setPrice] = useState(0)

  const checkoutCanceledHandler = () => {
    props.history.goBack()
  }
  const checkoutContinuedHandler = () => {
    props.history.replace("./checkout/contact-data")
  }
  useEffect(() => {
    const query = new URLSearchParams(props.location.search)
    console.log(query)
    const ingredients = {}
    //來自burgerbuilder.js
    for (let param of query.entries()) {
      console.log(param)
      console.log(param[0], param[1])

      if (param[0] === "price") {
        console.log("param[1]", param[0])

        setPrice(param)
      } else {
        ingredients[param[0]] = +param[1]
      }
    }

    setIngredient(ingredients)
    console.log(ingredients)
  }, [])

  return (
    <div>
      <CheckoutSummary
        ingredients={ingredient}
        checkoutCanceled={checkoutCanceledHandler}
        checkoutContinued={checkoutContinuedHandler}
      />
      <Route
        path={props.match.path + "/contact-data"}
        render={props => (
          <ContactData ingredients={ingredient} price={price} {...props} />
        )}
      />
    </div>
  )
}

export default Checkout
