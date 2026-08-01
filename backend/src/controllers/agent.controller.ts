import  type { Request , Response } from "express";


export async function anaylzeRepository(req  :Request , res: Response){
     
    try{

        const {githubURL }  = req.body;

        if(!githubURL){
             return res.status(400).json({
                 success :false,
                 message  :'githubURL is required'
             })
        }


    }
    catch(er){

        console.log(`Error is ${er}`)

        return res.status(500).json({
            success: false,
            message  :'Internal server Error'
        })

    }
}