import React from "react"
import classes from "./BuildControl.module.css"
import BuildControl from "./BuildControl/BuildControl"

const controls = [
  { label: "salad", type: "salad" },
  { label: "bacon", type: "bacon" },
  { label: "cheese", type: "cheese" },
  { label: "meat", type: "meat" }
]

const BuildControls = () => {
  return (
    <div className={classes.BuildControls}>
      {controls.map(control => (
        <BuildControl key={control.label} label={control.label} />
      ))}
    </div>
  )
}

export default BuildControls
