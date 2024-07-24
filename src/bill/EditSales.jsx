import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { updateSale, setEditedItems, setNewItem } from '../tab/billSlice'
import { removeTab, setActiveTab } from '../tab/tabSlice'
import './EditSales.css'

function EditSales () {
        const { saleIndex } = useParams()
        const sale = useSelector((state) => state.bill.sales[saleIndex])
        const editedItems = useSelector((state) => state.bill.editedItems[saleIndex] || sale.items)
        const newItem = useSelector((state) => state.bill.newItem[saleIndex] || { item: '', amount: 0, quantity: 0 })
        const dispatch = useDispatch()
        const navigate = useNavigate()
        console.log(editedItems)
        const handleItemChange = ( billIndex, e ) => {
        const { name, value } = e.target
        const parsedValue = name === 'amount' || name === 'quantity' ? parseFloat(value) : value
        const updatedItems = [...editedItems]   //shallow copy
        updatedItems [ billIndex ] = { ...updatedItems [ billIndex ], [ name ]: parsedValue }
        dispatch(setEditedItems({ saleIndex, items: updatedItems }))
    } 

    const handleNewItemChange = (e) => {
        const { name, value } = e.target
        const parsedValue = name === 'amount' || name === 'quantity' ? parseFloat(value) : value
        dispatch(setNewItem({ saleIndex, newItem: { ...newItem, [name]: parsedValue }}))
    }

    const addItem = () => {
        const updatedItems = [...editedItems, newItem]
        dispatch(setEditedItems({ saleIndex, items: updatedItems }))
        dispatch(setNewItem({ saleIndex, newItem: { item: '', amount: 0, quantity: 0 } }))
    }

    const handleSave = () => {
        const path = window.location.pathname
        dispatch(updateSale({ saleIndex, items: editedItems }))
        dispatch(removeTab({ path, navigation: navigate }))
        dispatch(setActiveTab({ path: '/sales' }))
        navigate('/sales')
    }

    if (!sale) {
        return <div>Sale not found</div>
    }

    return (
        <div className="edit-sales-container">
            <h2>Edit Sale for {sale.customerName}</h2>
            <table className="edit-sales-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Amount</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {editedItems.map((item, billIndex) => (
                        <tr key={billIndex}>
                           <td>
                                <input
                                    type="text"
                                    name="item"
                                    value={item.item}
                                    onChange={(e) => handleItemChange(billIndex, e)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="amount"
                                    value={item.amount}
                                    onChange={(e) => handleItemChange(billIndex, e)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(billIndex, e)}
                                />
                            </td>
                            <td>{item.amount * item.quantity}</td>
                        </tr>
                    ))}
                    <tr>
                        <td>
                            <input
                                type="text"
                                name="item"
                                value={newItem.item}
                                onChange={handleNewItemChange}
                                placeholder="New item"
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                name="amount"
                                value={newItem.amount}
                                onChange={handleNewItemChange}
                                placeholder="New amount"
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                name="quantity"
                                value={newItem.quantity}
                                onChange={handleNewItemChange}
                                placeholder="New quantity"
                            />
                        </td>
                        <td>
                            <button onClick={addItem}>Add Item</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className="save-button" onClick={handleSave}>Save</button>
        </div>
    );
}

export default EditSales;