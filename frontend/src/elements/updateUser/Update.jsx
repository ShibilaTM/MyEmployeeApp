import React, { useEffect, useState } from 'react'
import '../addUser/Add.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
const Update = () => {
    const {id} = useParams()
    const [user, setUser] = useState({
      name:'',
      email:'',
      designation:'',
      salary:''
    })
    const navigate= useNavigate() 

    const inputHandler = (e)=>{
      setUser({...user,
              [e.target.name]:e.target.value
      })
    }

    useEffect(() => {
      axios.get(`http://localhost:4000/form/getone/${id}`)
          .then((response) => {
            console.log(response)
              setUser(response.data);
          })
          .catch((error) => {
              console.error('Error fetching data:', error);
          });
  }, [id]);
  
    const submitForm=async(e)=>{
        e.preventDefault()
        await axios.put(`http://localhost:4000/form/update/${id}`,user)
        .then((response)=>{
          toast.success(response.data.message,{position:'top-right'})
          navigate('/user')
        })
        .catch((error)=>console.log(error))
    }

  return (
      <div className='addUser'>
      <h3>Add New User</h3>
      <form className='addUserForm' onSubmit={submitForm}>

        <div className='inputGroup'>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' name='name' value={user.name} autoComplete='off' onChange={inputHandler} placeholder='Name'/>
        </div>

        <div className='inputGroup'>
          <label htmlFor='email'>Email</label>
          <input type='text' id='email' name='email' value={user.email} autoComplete='off' onChange={inputHandler}  placeholder='Email'/>
        </div>

        <div className='inputGroup'>
          <label htmlFor='designation'>Designation</label>
          <input type='text' id='designation' name='designation' value={user.designation} onChange={inputHandler}  autoComplete='off' placeholder='Designation'/>
        </div>

        <div className='inputGroup'>
          <label htmlFor='salary'>Salary</label>
          <input type='text' id='salary' name='salary' value={user.salary} onChange={inputHandler} autoComplete='off' placeholder='Salary'/>
        </div>

        <div className='inputGroup'>
          <button type='submit'>Update User</button>
        </div>

      </form>
    </div>
  )
}

export default Update
