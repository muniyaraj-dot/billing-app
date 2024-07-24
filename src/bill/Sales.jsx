import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTab } from '../tab/tabSlice';
import { removeSale } from '../tab/billSlice'
import './Sales.css'

function Sales() {
    const sales = useSelector(state => state.bill.sales || [])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleEditClick = (saleIndex) => {
        const tabName = `Edit Sale ${saleIndex + 1}`
        const tabPath = `/edit-sale/${saleIndex}`
        dispatch(addTab({ name: tabName, path: tabPath }))
        navigate(tabPath)
    }

    const handleDeleteClick = (saleIndex) => {
        dispatch(removeSale(saleIndex))
    }

    return (
        <div className="sales-container">
            <h2>Sales</h2>
            <table className="sales-table">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Total Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sales?.map((sale, saleIndex) => (
                        <tr key={saleIndex}>
                            <td>{sale.customerName}</td>
                            <td>Rs.{sale.totalAmount.toFixed(2)}</td>
                            <td>
                                <button onClick={() => handleEditClick(saleIndex)}>Edit</button>
                                <button onClick={() => handleDeleteClick(saleIndex)}>Delete</button> {/* Add delete button */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Sales;