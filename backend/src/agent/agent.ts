import OpenAI from "openai";
import { env } from '../config/env.js'
import { SYSTEM_PROMPT } from "./prompt.js";
import { buildRepositoryContext } from "../services/repositoryContext.js";
// removed unused import to avoid shadowing
const client = new OpenAI({
     apiKey : env.OPENAI_API_KEY
})




export async function CreateDockerFileAgent(name : string, repo : string): Promise<string | null>{

    const context = await buildRepositoryContext(name , repo);   
   
    console.log(`Context is ${JSON.stringify(context , null , 2)}`)

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


    // Guard against undefined values from the API
    const content = response?.choices?.[0]?.message?.content ?? null;
    return content;

    
            }
    

           
    

    
      
