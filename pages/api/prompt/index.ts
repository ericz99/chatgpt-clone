// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextRequest } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";

type RoleType = "user" | "system" | "assistant";

type RequestBody = {
  prompt: {
    role: RoleType;
    content: string;
    name?: string;
  }[];
};

export const config = {
  runtime: "edge",
};

const createInstance = (apiKey?: string) => {
  // # create OpenAI configuration
  const configuration = new Configuration({
    apiKey: !apiKey ? process.env.OPENAI_API_KEY : apiKey,
  });

  // # create OpenAI API client
  return new OpenAIApi(configuration);
};

export default async function handler(req: NextRequest) {
  // # create OpenAI instance
  const instance = createInstance(req.headers.get("Authorization")!);

  try {
    const { prompt } = (await req.json()) as RequestBody;

    // # create chat completetion prompt
    const response = await instance.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...prompt],
      user: "user-1-hardcode",
      temperature: 0.5,
      max_tokens: 500,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.2,
      stream: true,
    });

    return new Response(response.body, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/event-stream;charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error: any) {
    console.log("hello");
    console.error(error);
    if (error.response) {
      console.error(error.response.status);
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    return new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    });
  }
}
