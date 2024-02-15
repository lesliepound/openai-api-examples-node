import OpenAI from "openai";

const openai = new OpenAI();

async function promptExample2(stuff) {
    let myStuff = (stuff) ? stuff : "Where was the world series played in 2020?"
   console.log("stuff", stuff)
    const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Who won the world series in 2020?"},
            {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
            {"role": "user", "content": myStuff}],
        model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0].message.content);
    const results = completion.choices[0].message.content
    return results;
}
//main();
export default promptExample2
