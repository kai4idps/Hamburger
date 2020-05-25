import React, { useState } from "react"
import Input from "../../component/UI/Input/Input"
import Button from "../../component/UI/Button/Button"
import classes from "./Auth.module.css"

const Auth = () => {
  const userData = {
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
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your Password"
      },
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  }
  const [orderForm, setOrderForm] = useState(userData)
  const [formIsValid, setFormIsValid] = useState(false)

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
  //inputChange
  const inputChangedHandler = (event, userName) => {
    console.log(event.target.value)

    const updatedOrderForm = {
      ...orderForm,
      [userData]: {
        ...orderForm[userName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          orderForm[userName].validation
        ),
        touch: true
      }
    }
    setOrderForm(updatedOrderForm)
  }
  //動態產生表單
  const formElementsArray = []
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    })
  }
  const form = formElementsArray.map(formElement => (
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
  ))
  return (
    <div className={classes.Auth}>
      <form>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
    </div>
  )
}

export default Auth
