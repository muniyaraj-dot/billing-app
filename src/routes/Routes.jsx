import React from 'react';
import { BrowserRouter, Routes as Router, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../bill/Home';
import Bill from '../bill/Bill';
import Sales from '../bill/Sales';
import EditSales from '../bill/EditSales'; // Import the new component

function Routes() {
    return (
        <div>
            <BrowserRouter>
                <Router>
                    <Route path='/*' element={<Layout />}>
                        <Route path='home' element={<Home />} />
                        <Route path='sales' element={<Sales />} />
                        <Route path='bill/:id' element={<Bill />} />
                        <Route path='edit-sale/:saleIndex' element={<EditSales />} /> {/* Add the new route */}
                    </Route>
                </Router>
            </BrowserRouter>
        </div>
    )
}

export default Routes