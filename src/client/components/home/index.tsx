import React, { createContext, useEffect, useState } from 'react'

import PageHeader from '@/components/common/PageHeader'
import Suggest from './Suggest'

export default () => {
  const [sug, setSug] = useState('')
  const getSug = (ev) => {
    setSug(ev.target.value)
  }
  const sugContext = createContext('sug')
  useEffect(() => {
    
  }, [sug])
  return (
    <>
      <PageHeader title="主页" />
      <div className="main layout">
        <input type="text" onBlur={ getSug } />
        { sug }
        <dl>
          <dt>热销榜</dt>
          <dd></dd>
        </dl>
        <Suggest sug={ sug } />
      </div>
    </>
  )
}