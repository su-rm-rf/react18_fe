import React, { Suspense } from 'react'
import { Route, Routes, useRoutes } from 'react-router'

import { useSelector, useDispatch } from 'react-redux'

import '@/styles'

import routes from './routers'
import FooterNav from '@/components/common/FooterNav'
import Loading from '@/components/common/Loading'

import { RouterBeforeEach } from '@/routers'

export default () => {
  const loading = useSelector((state:any) => state.global.loading)

  return (
    <div>
      <Loading show={loading} />
      <div className="main_body">
        {/* <Suspense> */}
        <Suspense fallback={ <Loading /> }>
          { useRoutes(routes) }
        </Suspense>
        
        {/* <Routes>
          {
            routes.map(({ path, element }) => (
              <Route key={ path } path={ path } Component={ element } />
            ))
          }
        </Routes> */}
      </div>
      <FooterNav />
      <RouterBeforeEach />
    </div>
  )
}