import express from 'express'
import { anaylzeRepository } from '../controllers/agent.controller.js';
const agent_router = express.Router();

agent_router.post('/analyze' , anaylzeRepository);

export default agent_router

