import OpenAI from "openai";

const openai = new OpenAI();

async function moderateText(textToCheck) {
    const response = await openai.moderations.create({ input: textToCheck });
    return response.results[0]  //output
}

export default moderateText

//runConversation().then(console.log).catch(console.error);