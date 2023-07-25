import React, { useState } from 'react'

import { useLocation, useNavigate } from "react-router-dom"

import { useSelector, useDispatch } from 'react-redux'

import { postSignin } from '../../store/globalSlice'

import PageHeader from '@/components/common/PageHeader'

export default () => {
  const dispatch = useDispatch()

  const location = useLocation()
  const navigate = useNavigate()

  let [username, setUsername] = useState('yuhualing')
  let [password, setPassword] = useState('abc123')
  let [errmsg, setErrmsg] = useState('')

  const updateUserName = (ev) => {
    setUsername(ev.target.value)
  }
  const updatePassword = (ev) => {
    setPassword(ev.target.value)
  }
  
  const signin = async () => {
    if (username && password) {
      setErrmsg('')
      const res = await dispatch(postSignin({
        username,
        password,
      }))
      if (res.payload?.data?.token) {
        navigate(-1)
      } else {
        setErrmsg('用户名或密码错误')
      }
    } else {
      setErrmsg('用户名或密码不能为空')
    }
  }

  return (
    <div>
      <PageHeader title="登录" />
      <div className="signin layout">
        <div className="errmsg">{ errmsg }</div>
        <div>
          <label>用户名：</label>
          <input type="text" onChange={ updateUserName } />
        </div>
        <div>
          <label>密码：</label>
          <input type="password" onChange={ updatePassword } />
        </div>
        <div className="button">
          <button onClick={ signin }>登录</button>
        </div>
      </div>
    </div>
  )
}