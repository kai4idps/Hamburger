import React, { useState } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import Input from "../../component/UI/Input/Input"
import Button from "../../component/UI/Button/Button"
import Spinner from "../../component/UI/spinner/Spinner"

import classes from "./Auth.module.css"
import * as actions from "../../store/actions/index"

const Auth = props => {
  const controls = {
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
  const [orderForm, setOrderForm] = useState(controls)
  const [formIsValid, setFormIsValid] = useState(false)
  const [isSignup, setIsSignup] = useState(true)

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
  const inputChangedHandler = (event, controlName) => {
    console.log(event.target.value)
    console.log("controlName", controlName)

    const updatedcontrols = {
      ...orderForm,
      [controlName]: {
        ...orderForm[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          orderForm[controlName].validation
        ),
        touched: true
      }
    }
    console.log("updatedcontrols", updatedcontrols)

    setOrderForm(updatedcontrols)
  }
  //submitHandler
  const submitHandler = event => {
    console.log("props", props)

    event.preventDefault()
    props.onAuth(orderForm.email.value, orderForm.password.value, isSignup)
  }
  //動態產生表單
  const formElementsArray = []
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    })
  }
  let form = formElementsArray.map(formElement => (
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
  //spinner
  if (props.loading) {
    form = <Spinner />
  }
  //error
  let errorMessage = null

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>
  }
  //登入
  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup)
  }
  console.log(props)

  //有認證後
  let authRedirect = null
  if (props.isAuthenticated) {
    authRedirect = <Redirect to="/" />
  }
  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button btnType="Danger" clicked={switchAuthModeHandler}>
        Switch to {isSignup ? "SignIn" : "SignUp"}
      </Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, signupMethod) =>
      dispatch(actions.auth(email, password, signupMethod))
  }
}

// export default Auth
export default connect(mapStateToProps, mapDispatchToProps)(Auth)
