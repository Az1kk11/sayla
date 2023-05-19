import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { logoutAdmin } from '../../redux/slice/auth'
import { removeItem } from '../../redux/helpers/persistance-storage'
import '../css/sidebar.css'

function LeftNavbar() {
    const [isOpen, setOpen] = useState(false)
    const toggle = () => setOpen(!isOpen)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logoutAdmin())
        removeItem('token')
        navigate('/admin')
    }

    return (
        <section
            className={isOpen ? ' sidebar-left navactive' : 'sidebar-left'}
            style={{ width: isOpen ? '250px' : '70px' }}
        >
            <i className="ri-menu-line" style={{ display: isOpen ? 'none' : 'block' }} onClick={toggle}></i>

            <div className="logo"
            >
                {isOpen ? (
                    <i className="ri-arrow-left-line"
                        style={{ paddingRight: isOpen ? '30px' : '0px' }}
                        onClick={toggle}></i>
                ) : (
                    <i className="ri-menu-line" onClick={toggle}></i>
                )}
                <h4 style={{ display: isOpen ? 'block' : 'none' }}>Sayla</h4>
            </div>
            <ul className='sidebar-menu'>
                {navbarItems.map((item, index) => (
                    <NavLink to={item.navigate}
                        key={index}
                        className={(navclassName) => navclassName.isActive ? 'nav-active' : ''}>
                        <li className="sidebar">
                            <span>{item.icon}</span>
                            <span style={{ display: isOpen ? 'block' : 'none' }}>{item.title}</span>
                        </li>
                    </NavLink>
                ))}
                <li className='sidebar text-light' onClick={logoutHandler}>
                    <i className="ri-logout-box-line"></i>
                    <span style={{ display: isOpen ? 'block' : 'none' }}>Logout</span>
                </li>
            </ul>
        </section>
    )
}

export default LeftNavbar

const navbarItems = [
    { title: 'Info', navigate: '/admin/info', icon: <i className="ri-folder-info-line"></i> },
    { title: 'Products', navigate: '/admin/products', icon: <i className="ri-product-hunt-line"></i> },
    { title: 'Add Products', navigate: '/admin/add-products', icon: <i className="ri-add-circle-line"></i> },
    { title: 'Orders', navigate: '/admin/orders', icon: <i className="ri-order-play-line"></i> },
    { title: 'Users', navigate: '/admin/users', icon: <i className="ri-user-search-line"></i> },
    { title: 'Add-Seller', navigate: '/admin/add-seller', icon: <i className="ri-user-add-line"></i> },
]