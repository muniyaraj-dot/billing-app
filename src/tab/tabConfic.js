export const getTabName = (params)=>{
    const path = window.location.pathname;
    if(path ==='/home'){
        return 'Home'
    }
    if(path === `/bill/${params.id}`){
        return 'bill'
    }
    if(path === '/sales'){
        return 'Sales'
    }
    if(path === `/edit-sale/${params.saleIndex}`){
        return 'Edit Sale'
    }
}