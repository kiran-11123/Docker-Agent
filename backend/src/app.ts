import express from 'express'
import cors from 'cors'
import agent_router from './routes/agent.routes.js'
const app = express()
import {env } from './config/env.js'
import logger from './logging/logging.js'
const PORT : number = env.PORT


app.use(cors())
app.use(express.json())



app.get("/health" , (req,res)=>{
      
    res.json({
         success : true,
         message : 'Docker Agent is running successfully'
    })
})
app.use('/api/agent' , agent_router)





app.listen(PORT , ()=>{
     console.log(
            `Server running on http://localhost:${PORT}`

     )
})


export default app