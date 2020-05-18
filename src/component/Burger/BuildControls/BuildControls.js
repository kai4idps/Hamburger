import React from "react"
import classes from "./BuildControls.module.css"
import BuildControl from "./BuildControl/BuildControl"

const controls = [
  { label: "salad", type: "salad" },
  { label: "bacon", type: "bacon" },
  { label: "cheese", type: "cheese" },
  { label: "meat", type: "meat" }
]

const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <h1>current price:{props.price.toFixed(2)}</h1>

      {controls.map(control => (
        <BuildControl
          key={control.label}
          label={control.label}
          type={control.type}
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)}
          disabled={props.purchaseable[control.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  )
}

export default BuildControls
