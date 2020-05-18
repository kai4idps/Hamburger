import React from "react"
import Auxx from "../../hoc/Auxx"

const Layout = props => {
  return (
    <>
      <Auxx>
        <div>TodalBar, SideDrawer,Backdrop</div>
        <main>{props.children}</main>
      </Auxx>
    </>
  )
}

export default Layout
