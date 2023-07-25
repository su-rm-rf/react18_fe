import React from 'react'

export default (props) => {
  return (
    <>
      {
        (props.show === undefined || !!props.show) ? 
        <div className="loading show">loading...</div> :
        <div className="loading">loading...</div>
      }
    </>
  )
}