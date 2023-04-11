// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { openai } from "@/shared";
import { IncomingMessage } from "http";

type RoleType = "user" | "system" | "assistant";

type RequestBody = {
  prompt: {
    role: RoleType;
    content: string;
    name?: string;
  }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/event-stream;charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("X-Accel-Buffering", "no");
  res.setHeader("Connection", "keep-alive");

  const body = req.body as RequestBody;

  if (!body) {
    res.status(405).send({ message: "Prompt is required!" });
    return;
  }

  try {
    const { prompt } = body;

    // # create chat completetion prompt
    const response = await openai.createChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages: [...prompt],
        user: "user-1-hardcode",
        temperature: 0.5,
        max_tokens: 500,
        top_p: 0.5,
        frequency_penalty: 0.5,
        presence_penalty: 0.2,
        stream: true,
      },
      {
        responseType: "stream",
      }
    );

    const stream = response.data as unknown as IncomingMessage;

    stream.on("data", (chunk: Buffer) => {
      const payloads = chunk.toString().split("\n\n");

      for (const payload of payloads) {
        if (payload.includes("[DONE]")) return;
        if (payload.startsWith("data:")) {
          const data = payload.replaceAll(/(\n)?^data:\s*/g, ""); // in case there's multiline data event
          try {
            const delta = JSON.parse(data.trim());
            res.write("event: openai-stream\n");
            res.write(
              `data: ${JSON.stringify({
                content: delta.choices[0].delta.content,
              })}`
            );
          } catch (error) {
            console.error(`Error with JSON.parse and ${payload}.\n${error}`);
          }
        }
      }
    });

    res.end("done");
  } catch (error: any) {
    console.error(error.response.data);
    res.status(500).send({
      error: "Something went wrong",
    });
  }
}
