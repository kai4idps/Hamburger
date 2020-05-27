import React, { useEffect } from "react"
import { connect } from "react-redux"

import Layout from "./hoc/Layouts/Layout"
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder"
import Checkout from "./container/Checkout/Checkout"
import Orders from "./container/Orders/Orders"
import { Route, Switch, Redirect, withRouter } from "react-router-dom"
import Auth from "./container/Auth/Auth"
import Logout from "./container/Auth/Logout/Logout"
import * as actions from "./store/actions/index"

// import ButtonStyle from "./test.module.css"

function App(props) {
  console.log(props)

  useEffect(() => {
    props.onTryAutoSignup()
  }, [])

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  )

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  )
}

// export default App

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
