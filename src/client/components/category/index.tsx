import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getCategoryList } from '@/store/categorySlice'

import PageHeader from '@/components/common/PageHeader'

export default () => {
  const categoryList = useSelector((state:any) => state.category.list)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategoryList())
  }, [])

  return (
    <>
      <PageHeader title="分类列表" />
      <ul className="category_list layout">
        分类列表
        {
          categoryList.map(item =>
            <li key={ item.id }>
              <div>{ item.name }</div>
              <nav>
                {
                  item.goods_list.map(item2 => 
                    <Link to={ `/category/${item2.id}` } key={ item2.id }>{ item2.name }</Link>
                  )
                }
              </nav>
            </li>
          )
        }
      </ul>
    </>
  )
}