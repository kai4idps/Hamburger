import React, { useState } from "react"
import Button from "../../../component/UI/Button/Button"
import axios from "../../../axiosOrder"
import Spinner from "../../../component/UI/spinner/Spinner"

import classes from "./ContactData.module.css"

const ContactData = props => {
  console.log(props)

  const formData = { name: "", email: "", age: "" }
  const [loading, setLoading] = useState(false)
  const [ingredient, setIngredient] = useState(null)
  const [price, setPrice] = useState(props.price)

  const orderHandler = event => {
    event.preventDefault()

    setLoading(true)
    const order = {
      ingredients: ingredient,
      price: price,
      customer: {
        name: "LEE",
        email: "test @gmail.com",
        deliveryMethod: "fatest"
      }
    }
    axios
      .post("/orders.json", order)
      .then(response => {
        console.log(response)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        console.log(error)
      })
  }

  let form = (
    <form>
      <input
        className={classes.Input}
        type="text"
        name="name"
        placeholder="name"
      />
      <input
        className={classes.Input}
        type="email"
        name="email"
        placeholder="email"
      />
      <input
        className={classes.Input}
        type="number"
        name="age"
        placeholder="age"
      />
      <Button btnType="Success" clicked={orderHandler}>
        ORDER
      </Button>
    </form>
  )
  if (loading) {
    form = <Spinner />
  }
  return (
    <div className={classes.ContactData}>
      <h4>{form}</h4>
    </div>
  )
}

export default ContactData
