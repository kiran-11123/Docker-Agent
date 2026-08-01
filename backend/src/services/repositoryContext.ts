import type { RepositoryContext  , ImportantFile } from "../types/repository.types.js";

import { GetGithubTree , getFile , getRepositroy } from "./github.service.js";


export async function buildRepositoryContext(owner :string , repo : string ) :Promise<RepositoryContext> {


    const repository = await getRepositroy(owner , repo);

    const tree  =await GetGithubTree(owner , repo , repository.defaultBranch);

    const filePaths = tree.map((item : any)=>item.path);

    const importantFiles  : ImportantFile = {} as ImportantFile

    
    const FilesToRead = [

        {
            path : "package.json",
            key : "packageJSON"
        },
       {
            path: "README.md",
            key: "readme"
        },
        {
            path: ".dockerignore",
            key: "dockerIgnore"
        },
        {
            path: "Dockerfile",
            key: "dockerFile"
        },
        {
            path: ".env.example",
            key: "envExample"
        },
        {
            path: "requirements.txt",
            key: "requirementsTxt"
        },
        {
            path: "pyproject.toml",
            key: "pyprojectToml"
        },
        {
            path: "pom.xml",
            key: "pomXml"
        },
        {
            path: "build.gradle",
            key: "buildGradle"
        },
        {
            path: "go.mod",
            key: "goMod"
        },
        {
            path: "Cargo.toml",
            key: "cargoToml"
        },
        {
            path: "composer.json",
            key: "composerJson"
        },
        {
            path: "next.config.js",
            key: "nextConfig"
        },
        {
            path: "next.config.ts",
            key: "nextConfig"
        },
        {
            path: "vite.config.ts",
            key: "viteConfig"
        },
        {
            path: "tsconfig.json",
            key: "tsConfig"
        }
    ]


    for(const file of FilesToRead){
          
        if(!filePaths.includes(file.path)) continue;

        try{

            const content = await getFile(owner , repo , repository.defaultBranch , file.path);

            (importantFiles as any)[file.key] = content;


        }
        catch(er){
        console.log(`Unable to read ${file.path}`);

        }
    }


    return {
        repository : {
            owner ,
            repo : repo,
            defaultbranch : repository.defaultBranch,
            description :   repository.description && repository.description.trim().length > 0
            ? repository.description
            : "Description is not provided"

        },
          tree: filePaths,

        importantFiles
    }

      
}