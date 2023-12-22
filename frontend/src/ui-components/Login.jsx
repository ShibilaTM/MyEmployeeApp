import { Box ,Button,TextField,Typography} from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios'
const Login = () => {
  const[data,setData] = useState({
    email:'',
    password:''
  })
  const navigate = useNavigate()
  const inputHandler=(e)=>{
    setData({...data,
      [e.target.name]:e.target.value
    })
  }
  const addHandler = async (e) => {
    try {
          
        const result = await axios.post('http://localhost:4000/user/login', data);

        if (result.data.message === 'success') {
            sessionStorage.setItem('userToken', result.data.token);

            // Check if result.data.role is defined before accessing it
            if (result.data.role) {
                sessionStorage.setItem('userRole', result.data.role);

                if (result.data.role === 'admin') {
                    // Handle admin login
                    console.log('Admin login successful');
                    // Redirect or navigate to the admin dashboard
                } else if (result.data.role === 'employee') {
                    // Handle employee login
                    console.log('Employee login successful');
                    // Redirect or navigate to the employee dashboard
                } else {
                    console.error('Unknown role in the payload');
                }
            } else {
                console.error('Role not available in the payload');
            }

            alert('success');
            navigate('/user');
        } else {
            alert('login failed');
        }
    } catch (error) {
        console.log(error);
    }
};


  return (
    <div>
      <form>
        <Box
            marginTop={5}
            display={'flex'}
            maxWidth={700}
            width={300}
            margin='auto'
            alignItems='center'
            flexDirection={'column'}
            justifyContent='center' // Center content horizontally
            padding={3}
            borderRadius={5}
            boxShadow={'5px 5px 10px #ccc'}
            sx={{
                ":hover":{
                    boxShadow:'10px 10px 20px #ccc'
                },
                position: 'absolute',  // If you want to center it relative to the entire viewport
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}       
        >
              <Typography display={'flex'} fontSize={30} color={'darkblue'} fontWeight={600}>
    Login
  </Typography>
  <TextField display={'flex'} sx={{ padding: '10px'}}  label='Email' name='email' onChange={inputHandler} type='text' fullWidth/>
  <TextField display={'flex'} sx={{ padding: '10px' }} label='Password' name='password' onChange={inputHandler} type='password' fullWidth />
  <Button
    fullWidth
    sx={{
      backgroundColor: 'darkblue',
      padding:'7px',
      marginTop:'3px',
      maxWidth:'700px',
      color: 'white',
      ':hover': {
        color: 'black', // Change text color to black on hover
        backgroundColor:'lightblue'
      },
    }}
    onClick={addHandler}
  >
    <LoginIcon/>
    Login
  </Button>
  <Link to='/signup' style={{ marginTop: '15px',  textAlign: 'left',color:'orangered'}}>
            Go to the Signup page
    </Link>
            
        </Box>
      </form>
    </div>
  )
}

export default Login
