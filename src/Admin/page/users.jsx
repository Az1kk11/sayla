import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUsersStart, getUsersSuccess } from '../../redux/slice/usersSlice'
import UserAuthServices from '../../redux/services/userAuth'
import Helmet from '../../Components/Helmet/Helmet'

import { Container } from 'reactstrap'

import '../css/Users.css'

function Users() {
  const { users, isLoading } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const getUsers = async () => {
    dispatch(getUsersStart())
    try {
      const response = await UserAuthServices.getUsers()
      dispatch(getUsersSuccess(response.users))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Helmet title='Users'>
      <section className='users'>
        <Container>
          <h3>All Users</h3>
          <div className="bg-box">
            {isLoading ? (
              <h3 className='text-light'>Loading...</h3>
            ) : (
              <table className='table'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Phone</th>
                    <th>Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.orders}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Container>
      </section>
    </Helmet>
  )
}

export default Users
