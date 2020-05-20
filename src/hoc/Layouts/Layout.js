import React, { useState } from "react"
import Auxx from "../Auxx/Auxx"
import ToolBar from "../../component/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../component/Navigation/SideDrawer/SideDrawer"

import classes from "./Layout.module.css"

const Layout = props => {
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
        <ToolBar drawerToggleClicked={sideDrawerToggleHandler} />
        <SideDrawer closed={sideDrawerClosedHandler} open={showSlideDraw} />
        <div>TodalBar, SideDrawer,Backdrop</div>
        <main className={classes.Content}>{props.children}</main>
      </Auxx>
    </>
  )
}

export default Layout
