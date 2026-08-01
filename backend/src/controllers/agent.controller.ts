import  type { Request , Response } from "express";
import { GetGithubTree , getRepositroy , getFile  ,parseGitHubURL } from "../services/github.service.js";


export async function anaylzeRepository(req  :Request , res: Response){
     
    try{

        const {githubURL}  = req.body;

        if(!githubURL){
             return res.status(400).json({
                 success :false,
                 message  :'githubURL is required'
             })
        }

        

        
        


        return res.status(200).json({
            success : true,
            message :' URL received successfully '
        })


    }
    catch(er){

        console.log(`Error is ${er}`)

        return res.status(500).json({
            success: false,
            message  :'Internal server Error'
        })

    }
}