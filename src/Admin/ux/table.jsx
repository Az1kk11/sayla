import React from 'react'
import { useNavigate } from 'react-router-dom'

function Table({ data }) {
    const navigate = useNavigate()
    return (
        <tbody>
            {data.map(item => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>28 Jan 2023</td>
                    <td>{item.user_name}</td>
                    <td>{item.product_name}</td>
                    <td className='completed'>
                        {item.status}
                    </td>
                    <td onClick={() => navigate('/admin/orders/order-details')} className='td-hover'>
                        <i className="ri-eye-line"></i>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

export default Table