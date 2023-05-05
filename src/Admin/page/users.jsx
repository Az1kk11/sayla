import React from 'react'
import { Container } from 'reactstrap'
import '../css/Users.css'
import Helmet from '../../Components/Helmet/Helmet'

function Users() {
  
  return (
    <Helmet title='Users'>
      <section className='users'>
        <Container>
          <h3>All Users</h3>
          <div className="bg-box">
            <table className='table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>Last Login</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12sd4c7c5</td>
                  <td>Az1kk11</td>
                  <td>Azizbek</td>
                  <td>Jaksilikov</td>
                  <td>azizbek@gmail.com</td>
                  <td>2023-04-28</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </Helmet>
  )
}

export default Users
