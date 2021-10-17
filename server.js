import express from 'express'
import { connectdb } from './dbConnection/index.js';
import { port } from './utils/constant.js';
import {userRouter} from './Routers/userRouter.js'

const app = express();
connectdb();

app.use(express.urlencoded({extended:true}))
app.use(express.json());


app.use('/user/v1',userRouter)

app.listen(port, () => console.log('Server starts at ', port))
