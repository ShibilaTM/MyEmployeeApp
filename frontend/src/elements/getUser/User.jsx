
import React, { useEffect, useState } from 'react'
import './User.css'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityUpdateIcon from '@mui/icons-material/SecurityUpdate';
import axios from 'axios'
import toast from 'react-hot-toast'
const User = () => {
  const [users,setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/form/getall');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

const deleteUser=async(userId)=>{
  await axios.delete(`http://localhost:4000/form/delete/${userId}`)
  .then((response)=>{
    setUsers((prevUser)=>prevUser.filter((user)=>user._id!==userId))
    toast.success(response.data.message,{position:'top-right'})
  }).catch((error)=>{
    console.log(error)
  })
}

  return (
    <div className='userTable'>
      <table border={1} cellPadding={15} cellSpacing={0}>
        <thead>
            <tr>
                <th>SI No:</th>
                <th>Employee Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        {Array.isArray(users) && users.map((user, index) => {
                return(
                  <tr key={user._id}>
                  <td>{index+1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.designation}</td>
                  <td className='actionButtons'>
                  <button onClick={()=>{deleteUser(user._id)}}><DeleteIcon/></button>
                  <Link to={`/update/`+user._id}><SecurityUpdateIcon/></Link>
                  </td>
              </tr>
                )
              })
              }
      
        </tbody>
      </table>
    </div>
  )
}

export default User
