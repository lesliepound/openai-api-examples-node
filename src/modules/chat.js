import OpenAI from "openai";

const openai = new OpenAI();

async function main(promptInput,temp) {
   // Just in case, the prompt  gets lost in development changes, it returns a fortune
   const prompt = (promptInput) ? promptInput : "Give me fortune cookie wisdom"

    const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}],
        temperature: 2,
         model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0].message.content);
    const results = completion.choices[0].message.content
    return results;
}
//main();
export default main
