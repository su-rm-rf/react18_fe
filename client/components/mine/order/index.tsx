import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { getOrderList, showLoading } from '@/store/orderSlice'

import PageHeader from '@/components/common/PageHeader'

export default () => {
  const orderList = useSelector((state:any) => state.order.list)
  const loading = useSelector((state:any) => state.order.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(showLoading())
    dispatch(getOrderList())
  }, [])

  return (
    <div>
      <PageHeader title="我的订单" back={ true } />
      <ul className="order_list layout">
        {
          orderList.map(order =>
            <li key={ order.id } className="order_item">
              <div className="order_info">
                <span className="order_id">订单号：<em>{ order.id }</em></span>
                <span className="total_amount">{ order.totalAmount }{ order.bill }</span>
              </div>
              <ul className="goods_list">
                {
                  order.goods && order.goods.map(goods =>
                    <li key={ goods.id } className="goods_item">
                      <span>{ goods.name }</span>
                      <span>{ goods.price } { goods.bill } / { goods.unit } x { goods.num } { goods.unit }</span>
                      <span>{ goods.amount } { goods.bill }</span>
                    </li>
                  )
                }
              </ul>
            </li>
          )
        }
      </ul>
    </div>
  )
}