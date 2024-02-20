import OpenAI from "openai";

const openai = new OpenAI();

async function main(promptInput,temp) {
   // Just in case, the prompt  gets lost in development changes, it returns a fortune
   const prompt = (promptInput) ? promptInput : "Give me fortune cookie wisdom"

    const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}],
         temperature: temp,    //1-2; higher numbers (ex 1.7) are more creative/less predicatble
         model: "gpt-3.5-turbo",  //gpt-4, gpt-4-turbo-preview
    });

    //console.log(completion.choices[0].message.content);
    const results = completion.choices[0].message.content
    return results;
}
//main();
export default main
