import React, { useEffect, useState } from "react"

import Modal from "../../component/UI/Modal/Modal"
import Auxx from "../Auxx/Auxx"

const WithErrorHandler = (WrappedComponent, axios) => {
  function CheckRequests(props) {
    const [error, setError] = useState(null)
    useEffect(() => {
      let reqInterceptor = axios.interceptors.response.use(req => {
        setError(null)
        return req
      })

      let resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          setError(error)
        }
      )
      return () => {
        // Clean up the subscription
        axios.interceptors.request.eject(reqInterceptor)
        axios.interceptors.response.eject(resInterceptor)
      }
    }, [error])
    const errorConfirmedHandler = () => {
      setError(null)
    }

    return (
      <Auxx>
        <Modal show={error} modalClose={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Auxx>
    )
  }
  return CheckRequests
}

export default WithErrorHandler
