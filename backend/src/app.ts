import express from 'express'
import cors from 'cors'
import { success } from 'zod'
const app = express()

app.use(cors())
app.use(express.json())



app.get("/health" , (req,res)=>{
      
    res.json({
         success : true,
         message : 'Docker Agent is running successfully'
    })
})

export default app