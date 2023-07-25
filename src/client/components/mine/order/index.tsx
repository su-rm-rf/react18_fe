import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getOrderList, showLoading } from '@/store/orderSlice'

import PageHeader from '@/components/common/PageHeader'

export default () => {
  const orderList = useSelector((state:any) => state.order.list)
  const loading = useSelector((state:any) => state.order.loading)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(showLoading())
    ;(async () => {
      const res = await dispatch(getOrderList())
      if (res.payload.errCode === 10031) {
        navigate('/signin', { replace: true })
      }
    })()
  }, [])

  return (
    <div>
      <PageHeader title="我的订单" back={ true } />
      <ul className="order_list layout">
        {
          orderList.map(order =>
            <li key={ order.id } className="order_item">
              <ul className="goods_list">
                {
                  order.goods && order.goods.map(goods =>
                    <li key={ goods.id } className="goods_item">
                      <span className="goods_info">{ goods.name }</span>
                      <div className="goods_price_num">
                        <span>{ goods.price } { goods.bill } / { goods.unit }</span>
                        <span>x { goods.num } { goods.unit }</span>
                      </div>
                    </li>
                  )
                }
              </ul>
              <div className="goods_sumary">
                <div>
                  <label>总价：</label>
                  <span>{ order.totalAmount }{ order.bill }</span>
                </div>
                <div className="real_pay">
                  <label>实付：</label>
                  <em>{ order.totalAmount }{ order.bill }</em>
                </div>
              </div>
              <div className="order_info">
                <div>
                  <label>订单号：</label>
                  <span>{ order.id }</span>
                </div>
                <div>
                  <label>创建时间：</label>
                  <span>{ order.created_at }</span>
                </div>
                <div>
                  <label>支付时间：</label>
                  <span>{ order.updated_at }</span>
                </div>
              </div>
            </li>
          )
        }
      </ul>
    </div>
  )
}