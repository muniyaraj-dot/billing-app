import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bills: {},
    billlist: {},
    sales: [],
    customerNames: {},
    editedItems: {},
    newItem: {},
};

const billSlice = createSlice({
    name: 'bills',
    initialState,
    reducers: {
        addBill: (state, action) => {
            const { id, bill } = action.payload;
            state.bills[id] = bill;
        },
        setbilllist: (state, action) => {
            const { id, bill } = action.payload;
            if (!state.billlist[id]) state.billlist[id] = [];

            state.billlist[id].push(bill);
        },
        editBill: (state, action) => {
            const { id, index, newItem } = action.payload;
            state.billlist[id][index] = newItem;
        },
        removeBill: (state, action) => {
            const { id, index } = action.payload;
            state.billlist[id] = state.billlist[id].filter((bill, i) => i !== index);
        },
        finalizeBill: (state, action) => {
            const { id } = action.payload;
            const customerName = state.customerNames[id];
            const totalAmount = state.billlist[id].reduce(
                (total, bill) => total + bill.amount * bill.quantity,
                0
            );
            state.sales.push({ customerName, totalAmount, items: state.billlist[id] });
            state.billlist[id] = [];
            state.bills[id] = { item: '', amount: '', quantity: '' };
            state.customerNames[id] = '';
        },
        setCustomerName: (state, action) => {
            const { id, customerName } = action.payload;
            state.customerNames[id] = customerName;
        },
        updateSale: (state, action) => {
            const { saleIndex, items } = action.payload;
            state.sales[saleIndex].items = items;
            state.sales[saleIndex].totalAmount = items.reduce(
                (total, item) => total + item.amount * item.quantity,
                0
            );
        },
        removeSale: (state, action) => {
            const saleIndex = action.payload;
            state.sales.splice(saleIndex, 1);
        },
        setEditedItems: (state, action) => {
            const { saleIndex, items } = action.payload;
            state.editedItems[saleIndex] = items;
        },
        setNewItem: (state, action) => {
            const { saleIndex, newItem } = action.payload
            state.newItem[saleIndex] = newItem
        },
    },
});

export const {
    addBill,
    setbilllist,
    editBill,
    removeBill,
    finalizeBill,
    setCustomerName,
    updateSale,
    removeSale,
    setEditedItems,
    setNewItem,
} = billSlice.actions;
export default billSlice.reducer;