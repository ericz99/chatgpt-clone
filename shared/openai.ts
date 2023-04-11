import { Configuration, OpenAIApi } from "openai";

// # create OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// # create OpenAI API client
export const openai = new OpenAIApi(configuration);
