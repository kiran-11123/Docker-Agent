import  type { Request , Response } from "express";
import { GetGithubTree , getRepositroy , getFile  ,parseGitHubURL } from "../services/github.service.js";
import {CreateDockerFileAgent} from "../agent/agent.js";

export async function anaylzeRepository(req  :Request , res: Response){
     
    try{

        const {githubURL}  = req.body;

        if(!githubURL){
             return res.status(400).json({
                 success :false,
                 message  :'githubURL is required'
             })
        }



        const result =  parseGitHubURL(githubURL);

        if(!result){

            return res.status(400).json({
                success : false,
                message  :'Invalid githubURL'
            })
        }

        const {owner , repo} = result;
        
        //@ts-ignore
        const dockerFile = await CreateDockerFileAgent(owner , repo);
        


        return res.status(200).json({
            success : true,
            message :' Docker file created successfully ',
            file : dockerFile
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