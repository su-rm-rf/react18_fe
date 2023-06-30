import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import PageHeader from '@/components/common/PageHeader'

export default () => {

  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: '',
    password: '',
    level: '',
  })
  const roles = { 0: '超级管理员', 1: '管理员', 2: '用户' }
  
  useEffect(() => {
    if (!localStorage.token) {
      navigate('/signin')
    } else {
      setUser(JSON.parse(localStorage.token))
    }
  }, [])

  const signout = () => {
    localStorage.token = ''
    document.cookie = 'token='
    navigate('/signin')
  }

  return (
    <>
      <PageHeader title="个人中心" />
      <div className="mine layout">
        <ul className="user_info">
          <li>
            <label>用户名：</label>
            <span>{ user.username }</span>
          </li>
          <li>
            <label>等级：</label>
            <span>{ roles[user.level] }</span>
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