// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { openai } from "@/shared";

type RequestBody = {
  prompt: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const body = req.body as RequestBody;

  if (!body) {
    res.status(405).send({ message: "Prompt is required!" });
    return;
  }

  try {
    const { prompt } = body;

    // # create chat completetion prompt
    const response = await openai.createImage({
      prompt: `${prompt}`,
      user: "user-1-hardcode",
      n: 1,
      size: "256x256",
    });

    console.log(response.data.data[0].url);

    return res.status(200).send({
      data: response.data.data[0].url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: "Something went wrong",
    });
  }
}
