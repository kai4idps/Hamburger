import React, { useEffect, useState } from "react"
import Order from "../../component/Order/Order"

import { connect } from "react-redux"
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import axios from "../../axiosOrder"
import * as actions from "../../store/actions/index"
import Spinner from "../../component/UI/spinner/Spinner"

export const Orders = props => {
  console.log(props)

  useEffect(() => {
    props.onFetchOrders(props.token, props.userId)
    console.log("build")

    // axios
    //   .get(`/orders.json?auth=${props.token}`)
    //   .then(response => {
    //     console.log("response", response)
    //     let fetchData = []
    //     for (let key in response.data) {
    //       fetchData.push({
    //         ...response.data[key],
    //         id: key
    //       })
    //     }
    //     setOrders(fetchData)
    //   })
    //   .catch(error => {})
  }, [])
  let orders = <Spinner />
  if (!props.loading) {
    orders = props.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ))
  }
  return <div>{orders}</div>
}

// export default WithErrorHandler(Orders, axios)
const mapStateToProps = state => {
  console.log(state)

  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Orders, axios))
