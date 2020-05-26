import React, { useState } from "react"
import { connect } from "react-redux"
import Auxx from "../Auxx/Auxx"
import ToolBar from "../../component/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../component/Navigation/SideDrawer/SideDrawer"

import classes from "./Layout.module.css"

const Layout = props => {
  console.log(props.isAuthenticated)

  const [showSlideDraw, setShowSlideDraw] = useState(false)
  const sideDrawerClosedHandler = () => {
    setShowSlideDraw(false)
  }

  const sideDrawerToggleHandler = () => {
    setShowSlideDraw(!showSlideDraw)
  }

  return (
    <>
      <Auxx>
        <ToolBar
          isAuth={props.isAuthenticated}
          drawerToggleClicked={sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={props.isAuthenticated}
          closed={sideDrawerClosedHandler}
          open={showSlideDraw}
        />
        <div>TodalBar, SideDrawer,Backdrop</div>
        <main className={classes.Content}>{props.children}</main>
      </Auxx>
    </>
  )
}

const mapStateToProps = state => {
  console.log(state.auth.token)

  return {
    isAuthenticated: state.auth.token != null
  }
}
export default connect(mapStateToProps)(Layout)
