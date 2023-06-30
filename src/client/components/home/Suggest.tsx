import React, { Component, ReactNode } from "react"

import List from "./List"

export default (props) => {
  return (
    <div>
      suggest { props.sug }
      <List />
    </div>
  )
}