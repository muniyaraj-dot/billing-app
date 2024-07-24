import React from 'react'
import './sidebar.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setActiveTab} from '../tab/tabSlice'
function Sidebar () {
    const navigat = useNavigate()
    const dispach = useDispatch()
    const date = new Date().getTime()
    const handilclick =(val)=>{
        dispach(setActiveTab({path:val}))
    navigat(val)
    }
  return (
    <div class="sidebar">
    <ul>
        <li onClick={()=>handilclick('/home')}><p>Home</p></li>
        <li onClick={()=>handilclick('/sales')}><p>Sales</p></li>
        <li onClick={()=>handilclick(`/bill/${date}`)}><p>Bill</p></li>
    </ul>
</div>

  )
}

export default Sidebar