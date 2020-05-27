import React, { useState } from "react"
import { connect } from "react-redux"

import Button from "../../../component/UI/Button/Button"
import axios from "../../../axiosOrder"
import Spinner from "../../../component/UI/spinner/Spinner"
import Input from "../../../component/UI/Input/Input"
import classes from "./ContactData.module.css"

import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler"
import * as actions from "../../../store/actions/index"
import { updateObject, checkValidity } from "../../../shareLogic/utility"

const ContactData = props => {
  console.log(props)
  console.log(props.price)

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
      orderData: formData,
      userId: props.userId
    }
    console.log(order)
    props.onOrderBurger(order, props.token)
    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     console.log(response)
    //     setLoading(false)
    //   })
    //   .catch(error => {
    //     setLoading(false)
    //     console.log(error)
    //   })
  }
  //inputChange
  const inputChangedHandler = (event, inputIdentifier) => {
    console.log(event.target.value)

    // const updatedOrderForm = {
    //   ...orderForm
    // }
    // const updatedFormElement = {
    //   ...updatedOrderForm[inputIdentifier]
    // }
    const updatedFormElement = updateObject(orderForm, {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true
    })
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement
    })

    // updatedFormElement.value = event.target.value
    // updatedFormElement.valid = checkValidity(
    //   updatedFormElement.value,
    //   updatedFormElement.validation
    // )
    // updatedFormElement.touched = true
    updatedOrderForm[inputIdentifier] = updatedFormElement
    console.log(updatedOrderForm)

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
  if (props.loading) {
    form = <Spinner />
  }
  return (
    <div className={classes.ContactData}>
      <h4>{form}</h4>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    pricee: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token))
  }
}
// export default ContactData
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios))
