import OpenAI from "openai";
import { env } from '../config/env.js'

const client = new OpenAI({
     apiKey : env.OPENAI_API_KEY
})

