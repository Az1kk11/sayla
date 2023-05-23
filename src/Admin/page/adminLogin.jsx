import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AuthServices from '../../redux/services/auth'
import { siginAdminStart, siginAdminSuccess, signAdminFailure } from '../../redux/slice/auth'
import Helmet from '../../Components/Helmet/Helmet'

import { Button } from 'reactstrap'
import { toast } from 'react-toastify'

import '../css/adminLogin.css'

function AdminLogin() {
  const { isLoading, logedIn } = useSelector(state => state.auth)
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginHandler = async e => {
    e.preventDefault()
    dispatch(siginAdminStart())
    const user = { phone, password }
    try {
      const response = await AuthServices.adminLogin(user)
      dispatch(siginAdminSuccess(response))
      toast.success('You have successfully logged in')
    } catch (error) {
      dispatch(signAdminFailure())
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    if (logedIn) {
      navigate('/admin/info')
    }
  }, [logedIn])

  return (
    <Helmet title='Admin-Login'>
      <section className='admin-login'>
        <form>
          <h3>Admin</h3>
          <div className="input-box">
            <input
              type='number'
              placeholder='Phone'
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder='Password'
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <Button
            color="primary"
            className='btn'
            type='submit'
            onClick={loginHandler}
            disabled={isLoading}
          >
            {isLoading ? 'loading...' : 'Login'}
          </Button>
        </form>
      </section>
    </Helmet>
  )
}

export default AdminLogin