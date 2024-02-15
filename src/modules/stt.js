import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

async function listen(userInput) {
    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream("speech.mp3"),
        model: "whisper-1",
    });
    return transcription;
}

export default listen

