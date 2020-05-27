import React from "react"

import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import { Orders } from "./Orders"
import orders from "../../component/Order/Order"

configure({ adapter: new Adapter() })

describe("<BurgerBuilder />", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Orders onFetchOrders={() => {}} />)
  })

  it("should render <BuildControls /> when receiving ingredients", () => {
    wrapper.setProps({ ings: { salad: 0 }, price: 4 })
    expect(wrapper.find(orders)).toHaveLength(1)
  })
})
