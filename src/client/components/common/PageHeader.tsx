import React from 'react'

import { useNavigate } from 'react-router'

export default (props) => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="page_header">
      {
        props.back && <i className="back" onClick={ goBack }>{ '<' }</i>
      }
      <h4>{ props.title }</h4>
    </div>
  )
}