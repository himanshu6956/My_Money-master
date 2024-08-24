require('dotenv').config()

const express = require('express')
const dbConnect = require('./dbConnect')
const app = express()
app.use(express.json())
const path = require('path')
const cors = require("cors")
const userRoute = require('./routes/usersRoute')
const transactionsRoute = require('./routes/transactionsRoute')
app.use('/api/users/' , userRoute)
app.use('/api/transactions/' , transactionsRoute)
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
const port =process.env.PORT || 8080

if(process.env.NODE_ENV === 'production')
{
     app.use('/' , express.static('../client/build'))

     app.get('*' , (req, res)=>{
         res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
     })
}



app.listen(port, () => console.log(`Node JS Server started at port ${port}!`))