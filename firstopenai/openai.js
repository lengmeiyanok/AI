// Please install OpenAI SDK first: `npm install openai`

import OpenAI from "openai";

const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: 'sk-yourapikey'
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "test link" }],
    model: "deepseek-chat",
  });

  console.log(completion.choices[0].message.content);
}

main();