import React, { useState } from "react"
import Auxx from "../../hoc/Auxx/Auxx"
import Burger from "../../component/Burger/Burger"
import BuildControls from "../../component/Burger/BuildControls/BuildControls"
import Modal from "../../component/UI/Modal/Modal"
import OrderSumary from "../../component/Burger/orderSummary/orderSummary"

const BurgerBuilder = (props) => {
  const ingredients = {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  }

  const [price, setPrice] = useState(4)
  const [ingredient, setIngredient] = useState(ingredients)
  const [purchaseable, setPurchaseable] = useState(false)
  const [purchasing, setPurchasing] = useState(false)

  const INGREDIENT_PRICE = { salad: 0.1, bacon: 0.1, cheese: 0.9, meat: 0.2 }
  const changeIngredient = { ...ingredient }

  const updatePurchaseState = () => {
    const sum = Object.keys(changeIngredient)
      .map((key) => {
        return changeIngredient[key]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)

    console.log(sum)
    sum > 0 ? setPurchaseable(true) : setPurchaseable(false)
  }
  const addIngredientHandler = (type) => {
    const oldCount = ingredient[type]
    const updateCount = oldCount + 1

    changeIngredient[type] = updateCount

    const priceAddition = INGREDIENT_PRICE[type]

    setPrice(price + priceAddition)
    setIngredient(changeIngredient)
    updatePurchaseState()
  }
  const removeIngredientHandler = (type) => {
    const oldCount = ingredient[type]
    const updateCount = oldCount - 1
    if (oldCount <= 0) {
      return
    }

    changeIngredient[type] = updateCount

    const priceAddition = INGREDIENT_PRICE[type]

    setPrice(price - priceAddition)
    setIngredient(changeIngredient)
    updatePurchaseState()
  }

  const purchasingHandle = () => {
    setPurchasing(true)
  }
  const purchasingCancelHandle = () => {
    setPurchasing(!purchasing)
  }
  const purchasingContinueHandle = () => {
    console.log("繼續購物")
  }
  console.log(purchasing)

  return (
    <Auxx>
      <Modal show={purchasing} modalClose={purchasingCancelHandle}>
        <OrderSumary
          ingredients={ingredient}
          purchaseCanceled={purchasingCancelHandle}
          purchasingContinued={purchasingContinueHandle}
          price={price}
        />
      </Modal>
      <Burger ingredients={ingredient} />
      <BuildControls
        ingredientAdded={addIngredientHandler}
        ingredientRemoved={removeIngredientHandler}
        purchaseable={purchaseable}
        price={price}
        ordered={purchasingHandle}
      />
    </Auxx>
  )
}

export default BurgerBuilder
