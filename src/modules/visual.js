import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "What’s in this image?" },
                    {
                        type: "image_url",
                        image_url: {
                            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
                        },
                    },
                ],
            },
        ],
    });
    return response.choices[0];
    //result.message.content;
    console.log(response.choices[0].message);
    console.log('-------',result);
}
main();
export default main
