import React from "react"
import Layout from "./hoc/Layouts/Layout"
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder"
import Checkout from "./container/Checkout/Checkout"
import Orders from "./container/Orders/Orders"
import { Route, Switch, Redirect } from "react-router-dom"
import Auth from "./container/Auth/Auth"
import Logout from "./container/Auth/Logout/Logout"

// import ButtonStyle from "./test.module.css"

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/Checkout" component={Checkout}></Route>
          <Route path="/Orders" component={Orders}></Route>
          <Route path="/auth" component={Auth}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Redirect to="/" />
        </Switch>
      </Layout>
      {/* <button className={ButtonStyle.blue}>blue</button> */}
    </div>
  )
}

export default App
