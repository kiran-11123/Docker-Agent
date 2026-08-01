import dotenv from 'dotenv'
dotenv.config();

const requiedEnv = [
    "GITHUB_TOKEN",
    "OPENAI_API_KEY"
];


for(const key of requiedEnv){
     
    if(!process.env[key]){
          
        throw new Error(`Missing environment variable ${key}`)
    }
}


export const env = {

    PORT : Number(process.env.PORT || 5000),
    GITHUB_TOKEN : process.env.GITHUB_TOKEN,
    OPENAI_API_KEY : process.env.OPENAI_API_KEY
}