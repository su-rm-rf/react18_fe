import React from 'react'

import { useNavigate } from 'react-router'

export default ({ back, title }) => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="page_header">
      {
        back && <i className="back" onClick={ goBack }>{ '<' }</i>
      }
      <h4>{ title }</h4>
    </div>
  )
}