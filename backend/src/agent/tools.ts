export const tools = [

{
type:"function",

function:{

name:"get_repository_metadata",

description:"Returns repository metadata",

parameters:{
type:"object",

properties:{},

required:[]
}

}

},

{

type:"function",

function:{

name:"get_repository_tree",

description:"Returns all files in repository",

parameters:{
type:"object",

properties:{},

required:[]
}

}

},

{

type:"function",

function:{

name:"read_repository_file",

description:"Reads a file from repository",

parameters:{
type:"object",

properties:{

path:{
type:"string",
description:"Path of file"
}

},

required:["path"]

}

}

}

];