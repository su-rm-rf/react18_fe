import React from 'react'

export default ({ show }) => {
  return (
    <>
      {
        (show === undefined || !!show) ? 
        <div className="loading show">loading...</div> :
        <div className="loading">loading...</div>
      }
    </>
  )
}