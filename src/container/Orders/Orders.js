import React, { useEffect, useState } from "react"
import Order from "../../component/Order/Order"

import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import axios from "../../axiosOrder"

const Orders = () => {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios
      .get("https://hamburger-75e31.firebaseio.com/orders.json")
      .then(response => {
        console.log("response", response)
        let fetchData = []
        for (let key in response.data) {
          fetchData.push({
            ...response.data[key],
            id: key
          })
        }
        setOrders(fetchData)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
      })
  }, [])
  console.log(orders)

  return (
    <div>
      {orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ))}
    </div>
  )
}

export default WithErrorHandler(Orders, axios)
