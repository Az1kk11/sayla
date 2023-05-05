import React from 'react'
import { Button } from 'reactstrap'
import '../css/adminLogin.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { siginAdminStart, siginAdminSuccess, signAdminFailure } from '../../redux/slice/auth'
import AuthServices from '../../redux/services/auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Helmet from '../../Components/Helmet/Helmet'

function AdminLogin() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { isLoading, logedIn } = useSelector(state => state.auth)
  const navigate = useNavigate()

  const loginHandler = async e => {
    e.preventDefault()
    dispatch(siginAdminStart())
    const user = { phone, password }
    try {
      const response = await AuthServices.adminLogin(user)
      dispatch(siginAdminSuccess(response))
    } catch (error) {
      dispatch(signAdminFailure())
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
          >
            {isLoading ? 'loading...' : 'Login'}
          </Button>
        </form>
      </section>
    </Helmet>
  )
}

export default AdminLogin