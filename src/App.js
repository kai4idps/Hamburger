import React from "react"
import Layout from "./hoc/Layouts/Layout"
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder"
import Checkout from "./container/Checkout/Checkout"
import Orders from "./container/Orders/Orders"
import { Route, Switch } from "react-router-dom"

// import ButtonStyle from "./test.module.css"

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/Checkout" component={Checkout}></Route>
          <Route path="/Orders" component={Orders}></Route>
          <Route path="/" component={BurgerBuilder}></Route>
        </Switch>
      </Layout>
      {/* <button className={ButtonStyle.blue}>blue</button> */}
    </div>
  )
}

export default App
