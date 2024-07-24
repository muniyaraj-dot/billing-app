import React from 'react'
import './tab.css'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveTab,removeTab } from './tabSlice';



function Tab() {
    const { tabs, activeTab } = useSelector((state) => state.tab);
    const navigat = useNavigate()
    const dispach = useDispatch()
    const handleTabClick =(val)=>{
        dispach(setActiveTab({path:val}))
        navigat(val)
    }
    const deleteTab =(e,val)=>{
        e.stopPropagation()
            dispach(removeTab({path:val,navigation:navigat}))
        }
    return (
        <div className="tab">
            {tabs.map((val) => (
                <button key={val.path} className={`tablinks ${val.path === activeTab ? 'activeTab' : ''}`}onClick={() => handleTabClick(val.path)}>{val.name}
            <span className='tabclose' onClick={(e)=>deleteTab(e,val.path)}>x</span>

                </button>
            ))}
        </div>
    );
}

export default Tab