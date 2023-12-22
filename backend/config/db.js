const mongoose = require('mongoose')
const MONGO_DB_URL = process.env.MONGO_DB_URL

mongoose.connect(MONGO_DB_URL,{
    dbName:'MytestDB'
})
.then(()=>{
    console.log('Mongo DB connected Successfully')
})
.catch((err)=>console.log('not connected'+err))