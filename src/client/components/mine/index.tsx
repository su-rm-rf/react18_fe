import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { getUserInfo, postSignout } from '../../store/globalSlice'
import PageHeader from '@/components/common/PageHeader'

export default () => {

  const navigate = useNavigate()
  const userInfo = useSelector((state: any) => state.global.userInfo)
  const dispatch = useDispatch()

  const roles = { 0: '超级管理员', 1: '管理员', 2: '用户' }
  
  useEffect(() => {
    const token = localStorage.token
    if (!token) {
      navigate('/signin')
    } else {
      ;(async () => {
        const res = await dispatch(getUserInfo(token))
        if (res.payload.errCode === 10031) {
          navigate('/signin')
        }
      })()
    }
  }, [])

  const signout = async() => {
    await dispatch(postSignout())
    navigate('/signin')
  }

  return (
    <>
      <PageHeader title="个人中心" />
      <div className="mine layout">
        <ul className="user_info">
          <li>
            <label>用户名：</label>
            <span>{ userInfo.username }</span>
          </li>
          <li>
            <label>等级：</label>
            <span>{ roles[userInfo.level] }</span>
          </li>
        </ul>

        <ul className="nav_list">
          <li>
            <Link to="/mine/order">订单<i>&gt;</i></Link>
          </li>
        </ul>
        <ul className="nav_list footer">
          <li>
            <button onClick={ signout }>退出</button>
          </li>
        </ul>
      </div>
    </>
  )
}