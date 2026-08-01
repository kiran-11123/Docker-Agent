import { GetGithubTree, getRepositroy , getFile } from "../services/github.service.js";


export async function executeTool(name:string,
args:any,
owner:string,
repo:string,
branch:string){
     

    switch(name){
         
     case "get_repository_metadata":

return await getRepositroy(owner,repo);

case "get_repository_tree":

return await GetGithubTree(owner,repo,branch);

case "read_repository_file":

return await getFile(
owner,
repo,
args.path
);

default:

throw new Error("Unknown tool");

    }
}