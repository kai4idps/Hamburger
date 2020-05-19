import React, { useState, useEffect } from "react"
import Auxx from "../../hoc/Auxx/Auxx"
import Burger from "../../component/Burger/Burger"
import BuildControls from "../../component/Burger/BuildControls/BuildControls"
import Modal from "../../component/UI/Modal/Modal"
import OrderSumary from "../../component/Burger/orderSummary/orderSummary"
import Spinner from "../../component/UI/spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import axios from "../../axiosOrder"

const BurgerBuilder = props => {
  const [price, setPrice] = useState(4)
  const [ingredient, setIngredient] = useState(null)
  const [purchaseable, setPurchaseable] = useState(false)
  const [purchasing, setPurchasing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const INGREDIENT_PRICE = { salad: 0.1, bacon: 0.1, cheese: 0.9, meat: 0.2 }
  const changeIngredient = { ...ingredient }

  const updatePurchaseState = () => {
    const sum = Object.keys(changeIngredient)
      .map(key => {
        return changeIngredient[key]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)

    sum > 0 ? setPurchaseable(true) : setPurchaseable(false)
  }
  const addIngredientHandler = type => {
    const oldCount = ingredient[type]
    const updateCount = oldCount + 1

    changeIngredient[type] = updateCount

    const priceAddition = INGREDIENT_PRICE[type]

    setPrice(price + priceAddition)
    setIngredient(changeIngredient)
    updatePurchaseState()
  }
  const removeIngredientHandler = type => {
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
    // console.log("繼續購物")
    setLoading(true)
    const order = {
      ingredients: ingredient,
      price: price,
      customer: {
        name: "LEE",
        email: "test @gmail.com",
        deliveryMethod: "fatest"
      }
    }
    axios
      .post("/orders.json", order)
      .then(response => {
        console.log(response)
        setPurchasing(false)
        setLoading(false)
      })
      .catch(error => {
        setPurchasing(false)
        setLoading(false)
        console.log(error)
      })
  }
  //
  let orderSummary

  //
  let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />
  if (ingredient) {
    burger = (
      <Auxx>
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
    orderSummary = (
      <OrderSumary
        ingredients={ingredient}
        purchaseCanceled={purchasingCancelHandle}
        purchasingContinued={purchasingContinueHandle}
        price={price}
      />
    )
  }

  if (loading) {
    orderSummary = <Spinner />
  }

  //動態拿到firebase json的值
  useEffect(() => {
    axios
      .get("https://hamburger-75e31.firebaseio.com/ingredients.json")
      .then(response => {
        setIngredient(response.data)
        return
      })
      .catch(error => {
        setError(true)
        return
      })
  }, [])

  return (
    <Auxx>
      <Modal show={purchasing} modalClose={purchasingCancelHandle}>
        {orderSummary}
      </Modal>
      {burger}
    </Auxx>
  )
}

export default withErrorHandler(BurgerBuilder, axios)
