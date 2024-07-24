import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tabs: [],
    activeTab: '',
};
const tabSlice = createSlice({
    name:'tab',
    initialState,
    reducers:{
       addTab:(state,action)=>{
        if(!state.tabs.some(val=>val.path === action.payload.path)){
            state.tabs.push(action.payload)
            state.activeTab = action.payload.path
        }
       },
       setActiveTab:(state,action)=>{
        state.activeTab = action.payload.path
       },
       removeTab:(state,action)=>{
           state.tabs = state.tabs.filter(val=>val.path !== action.payload.path)
           if(state.activeTab === action.payload.path){
            state.activeTab = state.tabs[state.tabs.length-1]?.path || '/home'
            action.payload.navigation(state.tabs[state.tabs.length-1]?.path || '/home')
           }
       }
    }
})
export const {addTab,removeTab,setActiveTab} = tabSlice.actions
export default tabSlice.reducer