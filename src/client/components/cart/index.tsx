import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { increment, decrement, incrementByAmount } from '@/store/counterSlice'

import PageHeader from '@/components/common/PageHeader'

export default () => {
  const count = useSelector((state:any) => state.counter.value)

  const dispatch = useDispatch()

  const doIncrement = () => {
    dispatch(increment())
    dispatch(incrementByAmount(3))
  }
  const doDecrement = () => {
    dispatch(decrement())
  }

  return (
    <>
      <PageHeader title="购物车" />
      <div className="cart layout">
        <button onClick={ () => doIncrement() }>新增</button>
        <span>{ count }</span>
        <button onClick={ doDecrement }>减少</button>
      </div>
    </>
  )
}