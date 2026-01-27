import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();


const GROQ_API_KEY=process.env.GROQ_API_KEY
const groq = new Groq({
  apiKey: GROQ_API_KEY
});

export async function summarizeBlog(blogText) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that summarizes blogs clearly and concisely.",
      },
      {
        role: "user",
        content: `Summarize the following blog in 4–5 sentences:\n\n${blogText}`,
      },
    ],
    temperature: 0.4,
    max_tokens: 200,
  });

  return completion.choices[0].message.content;
}

// import groq from "../config/groq.js"; // your Groq client

export async function blogChat(blogText, userMessage) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You are an AI assistant that answers questions based on the provided blog content. If the answer is not present in the blog, give answer on the basis of blog.",
      },
      {
        role: "user",
        content: `Blog Content:\n${blogText}`,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
    temperature: 0.3,
    max_tokens: 300,
  });

  return completion.choices[0].message.content;
}

