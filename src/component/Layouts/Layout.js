import React from "react"
import Auxx from "../../hoc/Auxx"
import ToolBar from "../Navigation/Toolbar/Toolbar"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"

import classes from "./Layout.module.css"

const Layout = props => {
  return (
    <>
      <Auxx>
        <ToolBar />
        <SideDrawer />
        <div>TodalBar, SideDrawer,Backdrop</div>
        <main className={classes.Content}>{props.children}</main>
      </Auxx>
    </>
  )
}

export default Layout
