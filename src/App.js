import React from "react"
import Layout from "./component/Layouts/Layout"
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder"

// import ButtonStyle from "./test.module.css"

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder> </BurgerBuilder>
      </Layout>
      {/* <button className={ButtonStyle.blue}>blue</button> */}
    </div>
  )
}

export default App
