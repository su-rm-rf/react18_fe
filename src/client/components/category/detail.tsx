import React, { useCallback, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'

import { getCategoryDetail, categoryNum } from '@/store/categorySlice'
import { addOrder } from '@/store/orderSlice'

import PageHeader from '@/components/common/PageHeader'

export default () => {
  const detail = useSelector((state:any) => state.category.detail)
  let num = useSelector((state:any) => state.category.num)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    // useCallback(() => dispatch(getCategoryDetail(id)), [])
    dispatch(getCategoryDetail(id))
  }, [])

  const setNum = (type) => {
    dispatch(categoryNum(type))
  }

  const cart = () => {

  }
  const order = async () => {
    const res = await dispatch(addOrder({
      goods_id: detail.id,
      num,
    }))
    if (!res.payload.data) {
      navigate('/signin')
    } else {
      navigate('/mine', { replace: true })
    }
  }
  
  return (
    <>
      <PageHeader title="商品详情" back={ true } />
      <div className="category_detail layout">
        <ul className="category_info">
          <li>
            <label>商品ID：</label>
            <span>{ detail.id }</span>
          </li>
          <li>
            <label>名称：</label>
            <span>{ detail.name }</span>
          </li>
          <li>
            <label>价格：</label>
            <span>{ detail.price } { detail.bill } / { detail.unit }</span>
          </li>
          <li>
            <label>所属品类：</label>
            <span>{ detail.category_name }</span>
          </li>
        </ul>
        <div className="category_num">
          {
            num <= 1 ? 
            <button disabled>-</button> :
            <button onClick={ () => setNum('-')}>-</button>
          }
          <input type="text" readOnly value={ num } />
          <button onClick={ () => setNum('+')}>+</button>
        </div>
        <div className="category_btn_list">
          <button onClick={ cart }>购物车</button>
          <button onClick={ order }>下 单</button>
        </div>
      </div>
    </>
  )
}