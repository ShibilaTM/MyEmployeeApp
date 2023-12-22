import React, { useState } from 'react'
import './Add.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const Add = () => {
  const [form,setForm] = useState({
    name:'',
    email:'',
    designation:'',
    salary:''
  })
  const navigate = useNavigate()
  const inputForm=(e)=>{
    setForm({...form,
      [e.target.name]:e.target.value
    })
  }

  const submitForm=async(e)=>{
    e.preventDefault()
    await axios.post('http://localhost:4000/form/create',form)
    .then((response)=>{
      console.log(response)
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
          <input type='text' id='name' name='name' autoComplete='off' placeholder='Name' onChange={inputForm}/>
        </div>

        <div className='inputGroup'>
          <label htmlFor='email'>Email</label>
          <input type='text' id='email' name='email' autoComplete='off' placeholder='Email' onChange={inputForm}/>
        </div>

        <div className='inputGroup'>
          <label htmlFor='designation'>Designation</label>
          <input type='text' id='designation' name='designation' autoComplete='off' placeholder='Designation' onChange={inputForm}/>
        </div>

        <div className='inputGroup'>
          <label htmlFor='salary'>Salary</label>
          <input type='text' id='salary' name='salary' autoComplete='off' placeholder='Salary' onChange={inputForm}/>
        </div>

        <div className='inputGroup'>
          <button type='submit'>Add User</button>
        </div>

      </form>
      
    </div>
  )
}

export default Add
