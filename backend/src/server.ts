import app from "./app.js";
import {env } from './config/env.js'


const PORT : number = env.PORT


app.listen(PORT , ()=>{
     console.log(
            `Server running on http://localhost:${PORT}`

     )
})
