import OpenAI from "openai";
import { env } from '../config/env.js'
import { SYSTEM_PROMPT } from "./prompt.js";
import { buildRepositoryContext } from "../services/repositoryContext.js";
const client = new OpenAI({
     apiKey : env.OPENAI_API_KEY
})




export async function CreateDockerFileAgent(name : string, repo : string){

    const context = await buildRepositoryContext(name , repo);   


    const response = await client.chat.completions.create({
        model : "gpt-4o-mini",
        messages : [
            {
                role : "system",
                content : SYSTEM_PROMPT
            },{
                role : "user",
                content : JSON.stringify( context , null , 2)
            }
        ]
    })
            }
    
    

    
      
