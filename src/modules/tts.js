import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI();

const speechFile = path.resolve("./speech.mp3");



// This will print the selected value
async function speak(userInput,voiceID) {
//stream=True
    try {
        const text2Speak = userInput || "Be Alert"; // Use user input or default text
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: voiceID,
            input: text2Speak,
            stream: true,

        });
        const buffer = Buffer.from(await mp3.arrayBuffer());
        return buffer; // Return the audio buffer for further use
    } catch (error) {
        console.log("Error generating audio:", error);
        throw error; // Re-throw the error for proper handling
    }
}

export default speak