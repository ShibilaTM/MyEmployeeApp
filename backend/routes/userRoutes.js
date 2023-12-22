const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
const UserData = require('../model/userModel');
const jwt= require('jsonwebtoken')

router.post('/add', async (req, res) => {
    try {
        const data = req.body;
        console.log('Received data:', data);

        const userInstance = new UserData(data);
        const savedData = await userInstance.save();
        res.status(200).json({message:'success'});
    } catch (error) {
        console.error('Error in saving the data:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


const admin = {
    email: "admin@gmail.com",
    password: "Admin123",
    role: 'admin'
}

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === admin.email && password === admin.password) {
            // Generate a token for admin
            let adminPayload = { email: admin.email, userId: 'admin', role: admin.role };
            let adminToken = jwt.sign(adminPayload, 'myEmployeeApp');

            res.status(200).json({ message: 'success', token: adminToken, role: admin.role });
        } else if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Email and password are required' });
        } else {
            const user = await UserData.findOne({ email });

            if (user) {
                if (password === user.password) {
                    // Generate a token for employee
                    let userPayload = { email: user.email, userId: user._id, role: 'employee' };
                    let userToken = jwt.sign(userPayload, 'myEmployeeApp');

                    res.status(200).json({ message: 'success', token: userToken, role: 'employee' });
                } else {
                    res.status(200).json({ message: 'invalid password' });
                }
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }
    } catch (error) {
        console.error('Error in login:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;
