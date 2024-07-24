import React, { useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import Tab from '../tab/Tab'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import './layout.css'
import { getTabName } from '../tab/tabConfic'
import { useDispatch } from 'react-redux'
import { addTab } from '../tab/tabSlice'


function Layout() {
   const dispatch= useDispatch()
   const navigate = useNavigate()
    const params = useParams()
    console.log(params)

    useEffect(() => {
        const tabName = getTabName(params)
        if (tabName) {
            dispatch(addTab({ name: tabName, path: window.location.pathname }))
        }
        else{
          navigate('/home')
        }
    }, [window.location.pathname, params, dispatch])
  return (
    <div>
    <div>
        <Sidebar/>
        <Tab/>
    </div>
    <div className='outlet'>
        <Outlet/>
    </div>
    </div>
  )
}

export default Layout
