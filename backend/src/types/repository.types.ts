export interface repositoryInfo{

    owner : string,
    repo : string,
    defaultbranch :string,
    description?:string | undefined
}

export interface ImportantFile{
     
    //node
    packageJSon?:string,
    readme?:string,
    dockerIgnore?:string,
    dockerFile ? :string,
    envExample?:string,
    
    //python
    requirementsTxt?:string,
    pyprojectToml?:string,


    //java

    pomXml?:string,
    buildGradle?: string;

    //golang

    
goMod?: string;

    cargoToml?: string;

    composerJson?: string;

    nextConfig?: string;
    viteConfig?: string;

    tsConfig?: string;


}

export interface RepositoryContext{
     
    repository : repositoryInfo,

    tree :string[],
    importantFiles : ImportantFile
}