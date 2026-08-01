import { Octokit } from "octokit";
import { env } from "../config/env.js"
import type { Parts } from "openai/resources/uploads.js";

export const octokit = new Octokit({
     auth : env.GITHUB_TOKEN
})



export  function parseGitHubURL(url : string){

    if(!url){
        throw new Error('URL is invalid')
    }
      
    try{
        const parsedURL = new URL(url);

        if(parsedURL.hostname !== "github.com"){
             throw new Error('Only github urls are supported')
        }

         const parts =parsedURL.pathname
    .split("/")
    .filter(Boolean);

  if (parts.length < 2) {
    throw new Error("Invalid GitHub repository URL");
  }

  return {
    owner: parts[0],
    repo: parts[1]
  };

    }
    catch(er){
         throw er;
    }
}


export async function getRepositroy(owner :string,  repo:string){



      try{

          const response = await octokit.rest.repos.get({
            owner , 
            repo
          }); 


         return {
        name: response.data.name,
        fullName: response.data.full_name,
        defaultBranch: response.data.default_branch,
        language: response.data.language,
        private: response.data.private,
        description: response.data.description,
    };

      }
      catch(er){

        throw er;
      }
       

}


export async function GetGithubTree(owner  :string , repo : string , branch  :string){
      
    try{

        const response = await octokit.rest.git.getTree({
            owner ,
            repo,
            tree_sha : branch,
            recursive : "true"
        })

        return response.data.tree

    }
    catch(er){
        throw er;
    }
}


export async function getFile(owner : string , repo :string , branch : string ,  path : string){
     
    try{

        const response = await octokit.rest.repos.getContent({
             owner,
             repo,
             branch,
             path
        })

        if(Array.isArray(response.data)){
              throw new Error(`${path} is a directory`);
        }

        if(!("content" in response.data)){
             throw new Error(`Could not read ${path}`);
        }


        return Buffer.from(response.data.content , 'base64').toString('utf-8')

    }
    catch(er){
        throw er;
    }
}