import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    return (
        <div className="d-flex align-items-center flex-column ">
            <h3 className='text-light fs-1'>Sayla</h3>
            <button onClick={() => navigate('/admin/info')} className="btn btn-success mt-4">Admin</button>
        </div>
    )
}

export default Home