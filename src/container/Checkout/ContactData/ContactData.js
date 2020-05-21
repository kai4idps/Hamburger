import React, { useState } from "react"
import Button from "../../../component/UI/Button/Button"
import axios from "../../../axiosOrder"
import Spinner from "../../../component/UI/spinner/Spinner"
import Input from "../../../component/UI/Input/Input"
import classes from "./ContactData.module.css"

const ContactData = props => {
  console.log(props)
  console.log(props.ingredients)

  const formData = {
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" }
        ]
      },
      value: "",
      validation: {},
      valid: true
    }
  }
  const [orderForm, setOrderForm] = useState(formData)
  const [loading, setLoading] = useState(false)
  const [formIsValid, setFormIsValid] = useState(false)
  const ingredient = props.ingredients
  const price = props.price

  const orderHandler = event => {
    event.preventDefault()

    setLoading(true)

    const formData = {}
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value
    }
    const order = {
      ingredients: ingredient,
      price: price,
      orderData: formData
    }
    console.log(order)

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
  //inputChange
  const inputChangedHandler = (event, inputIdentifier) => {
    console.log(event.target.value)

    const updatedOrderForm = {
      ...orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    }
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    )
    updatedFormElement.touched = true
    updatedOrderForm[inputIdentifier] = updatedFormElement

    let formIsValid = true
    //以驗證過正確格式
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
      console.log(updatedOrderForm)
    }
    setOrderForm(updatedOrderForm)
    setFormIsValid(formIsValid)
    // this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
  }
  //檢查欄位
  const checkValidity = (value, rules) => {
    console.log(rules)

    let isValid = true
    if (!rules) {
      return true
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/
      isValid = pattern.test(value) && isValid
    }

    return isValid
  }
  //動態產生表單
  const formElementsArray = []
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    })
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
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
