import type { RepositoryContext  , ImportantFile } from "../types/repository.types.js";
import logger from "../logging/logging.js";
import { GetGithubTree , getFile , getRepositroy } from "./github.service.js";


export async function buildRepositoryContext(owner :string , repo : string ) :Promise<RepositoryContext> {


    const repository = await getRepositroy(owner , repo);

    logger.info(`Repository is ${repository}`)

    if(!repository){
        throw new Error(`Repository ${owner}/${repo} not found`);
    }

    const tree  =await GetGithubTree(owner , repo , repository.defaultBranch);

    const filteredTree = tree.filter((item: any) => {
    const path = item.path;

    return !(
        path.includes("node_modules") ||
        path.includes(".git") ||
        path.includes("dist") ||
        path.includes("build") ||
        path.includes(".next")
    );
}); 

    logger.info(`filtered Tree is ${JSON.stringify(filteredTree)}`)
    const filePaths = filteredTree.map((item : any)=>item.path);

    const importantFiles  : ImportantFile = {}

    
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


  for (const file of FilesToRead) {

    const actualFilePath = filePaths.find((path) =>
        path.endsWith(file.path)
    );


    if (!actualFilePath) continue;


    try {

        const content = await getFile(
            owner,
            repo,
            repository.defaultBranch,
            actualFilePath
        );


        (importantFiles as any)[file.key] = content;


        logger.info(`Read file ${actualFilePath}`);

    }
    catch(er){

        logger.error(`Unable to read ${actualFilePath}`);

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