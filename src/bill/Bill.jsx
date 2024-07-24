import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addBill, setbilllist, editBill, removeBill, finalizeBill, setCustomerName } from '../tab/billSlice'
import { useNavigate, useParams } from 'react-router-dom'
import './Bill.css'
import { setActiveTab } from '../tab/tabSlice'
function Bill() {
    const navigat = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()
    const billData = useSelector(state => state.bill.bills[id] || { item: '', amount: '', quantity: '' })
    const billList = useSelector(state => state.bill.billlist[id] || [])
    const customerName = useSelector(state => state.bill.customerNames[id] || '')
    const [editingIndex, setEditingIndex] = useState(-1)
    console.log(billData)
    console.log(billList)
    useEffect(() => {
        if (editingIndex !== -1) {
            const billToEdit = billList[editingIndex]
            dispatch(addBill({ id, bill: billToEdit }))
        }
    }, [editingIndex, billList, dispatch, id])

    const setBill = (e) => {
       const { name, value } = e.target     
       const parsedValue = name === 'amount' || name === 'quantity' ? parseFloat(value) : value
        dispatch(addBill({ id, bill: { ...billData, [name]: parsedValue } }))       
    }

    const setCustomerNameOnce = (e) => {
        const { value } = e.target;
        dispatch(setCustomerName({ id, customerName: value }));
    }

    const setbilldata = () => {
        if (editingIndex !== -1) {
            dispatch(editBill({ id, index: editingIndex, newItem: billData }))
            dispatch(addBill({ id, bill: { item: '', amount: '', quantity: '' } }))

            setEditingIndex(-1)
        } else {
            dispatch(setbilllist({ id, bill: { ...billData, total: billData.amount * billData.quantity } }));
            dispatch(addBill({ id, bill: { item: '', amount: '', quantity: '' } }))
        }
    }

    const editItem = (index) => {
        setEditingIndex(index);
        // dispatch(addBill({ id, bill: index }))
    }

    const cancelEdit = () => {
        setEditingIndex(-1);
        dispatch(addBill({ id, bill: { item: '', amount: '', quantity: '' } }));
    }

    const deleteItem = (index) => {
        dispatch(removeBill({ id, index }))
    }
    const finalizeAndSave = () => {
        dispatch(setActiveTab({path:'/sales'}))
        navigat('/sales')
        dispatch(finalizeBill({ id }))
    }    
    return (
        <div>
            <div className="input-container">
            <label className="input-label">Customer Name:</label>
                <input
                    type='text'
                    name='customerName'
                    value={customerName}
                    onChange={setCustomerNameOnce}
                    className="input-field"
                    placeholder='Enter Customer Name'
                    disabled={billList.length > 0}
                />
            </div>
            <div className="input-container">
                <label className="input-label">Item:</label>
                <input
                    type='text'
                    name='item'
                    value={billData.item}
                    onChange={setBill}
                    className="input-field"
                    placeholder='Enter Item Name'
                />
            </div>
            <div className="input-container">
                <label className="input-label">Amount:</label>
                <input
                    type='number'
                    name='amount'
                    value={billData.amount}
                    onChange={setBill}
                    className="input-field"
                    placeholder='Enter Amount'
                     />
            </div>

            <div className="input-container">
                <label className="input-label">Quantity:</label>
                <input
                    type='number'
                    name='quantity'
                    value={billData.quantity}
                    onChange={setBill}
                    className="input-field"
                    placeholder='Enter Quantity'
                />
            </div>

            <div className="button-container">
                {editingIndex !== -1 ? (
                    <>
                        <button className="button" onClick={setbilldata}>Save</button>
                        <button className="button" onClick={cancelEdit}>Cancel</button>
                    </>
                ) : (
                    <button className="button" onClick={setbilldata}>Enter</button>
                )}
            </div>

            <div className="table-container">
                <table className="bill-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Amount</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billList?.map((bill, index) => (
                            <tr key={index}>
                                <td>{bill.item}</td>
                                <td>{bill.amount}</td>
                                <td>{bill.quantity}</td>
                                <td>{bill.amount * bill.quantity}</td>
                                <td>
                                    <button className="table-button" onClick={() => editItem(index)}>Edit</button>
                                    <button className="table-button" onClick={() => deleteItem(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'right' }}>Total Amount:</td>
                            <td>{billList.reduce((total, bill) => total + (bill.amount * bill.quantity),0)}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="button-container">
                <button className="button" onClick={finalizeAndSave}>Finalize Bill and Save</button>
            </div>
        </div>
    )
}

export default Bill;