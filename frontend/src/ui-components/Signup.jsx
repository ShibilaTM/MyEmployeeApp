import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import axios from 'axios';

const Signup = () => {
  const [user,setUser] = useState({
    name:'',
    email:'',
    password:'',
    confirmpassword:''
  })
  const navigate=useNavigate()
  const inputHandler=(e)=>{
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }
  const addHandler = async (e) => {
    try {
        const result = await axios.post('http://localhost:4000/user/add', user);
        console.log('Signup Result:', result.data);

        if (result.data.message === 'success') {
            alert('Registered successfully');
            navigate('/');
            window.location.reload(false);
        } else {
            alert('Registration failed');
        }
    } catch (error) {
        console.error('Error during registration:', error.message);
        alert('Registration failed. Please try again.');
    }
};

  return (
    <div>
      <form>
        <Box
            display={'flex'}
            marginTop={5}
            maxWidth={800}
            //  width={'35%'}
            alignItems={'center'}
            margin={'auto'}
            justifyContent={'center'} 
            flexDirection={'column'}
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
          <Typography display={'flex'} fontSize={30} fontWeight={600} color={'darkblue'} >Signup</Typography>
          <TextField label='Name' name='name' type='text' display='flex' fullWidth sx={{ padding: '10px'}} onChange={inputHandler}/>
          <TextField label='Email' name='email' type='text' display='flex' fullWidth sx={{ padding: '10px'}} onChange={inputHandler}/>
          <TextField label='Password' name='password' type='password' display='flex' fullWidth sx={{ padding: '10px'}} onChange={inputHandler} />
          <TextField label='Confirm password' name='confirmpassword' type='password' display='flex' fullWidth sx={{ padding: '10px'}} onChange={inputHandler}/>
          <Button 
              sx={{backgroundColor:'darkblue', color:'white',
              ":hover":{color:'black',backgroundColor:'lightblue'}}}
              fullWidth
              onClick={addHandler}
              >
                <LockOpenIcon/>
            Signup
            </Button>
            <Link to='/' style={{textAlign:'left', marginTop:'15px', color:'orangered'}}>Already registered Go to Login</Link>
        </Box>
      </form>
    </div>
  )
}

export default Signup
