// server.js
import express from 'express';
import bodyParser from 'body-parser';

// importing modules for each API example


import speak from "./src/modules/tts.js";
import listen from "./src/modules/stt.js";
import runConversation from "./src/modules/functions.js";
//import plainConversation from "./src/modules/functions.js";


// Setting up local environment
const port = 3000;
const host = 'localhost';

// Setting up middleware
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setting up Routes **

// this is server side
//stup tools/messaging
app.post('/slide/:id', async (req, res) => {
    //console.log(id)
    const { response } = req.body;
    const slide = slides[req.params.id];
    const intents = ['blue','green'];  // where do the intents come from
    // 1. Use AI to match user response to valid choices  //slide.validResponses
   // const aiResponse = await matchResponseToValidChoices(response, ['blue','green']);

    const aiResponse = await matchResponseToValidChoices(response, intents);

    // Handle unmatched responses (optional)
    if (!aiResponse.matched) {
        // ... (Logic for handling unmatched responses)
        return res.json({ nextSlideId: "unmatchedSlide" });
    }

    const nextSlideId = slide.nextSlideLogic(aiResponse.matched);
    res.json({ nextSlideId });
});

async function matchResponseToValidChoices(response, validResponses) {
    // Call your generative AI API with a prompt like:
    // "Match the user's input '$response' to the closest option in the list: $validResponses"
    // Example using OpenAI:
    // const answer = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo-1106",
    //     messages: messages,
    //     tools: tools,
    //     tool_choice: "auto", // auto is default, but we'll be explicit
    // });

    //const openai = new OpenAI(/* Your API key */);
    const completion = await openai.create({
        model: "gpt-3.5-turbo-1106", // Or your chosen model
        prompt: `Match the user's input '${answer}' to the closest option in the list: blue,green, pink\`; // ${validResponses.join(", ")}`,
        messages: messages,
        tools: tools,
    });

    // Parse the AI response to extract matched location and original input
    const matched = completion.data.choices[0].text.trim();
    return { location: matched, matched: validResponses.includes(matched) ? matched : null };
}

// test code
// Functions


app.post('/apps/openai-funcs', async (req, res) => {
    try {
        const { prompt, model, options } = req.body;
        //const { prompt, model, level, options } = req.body;
        console.log('---->', model);
        // Await the result of runConversation
        const result = await runConversation(prompt, options, model);

        // Now log the result
        console.log('---->', result);

        // Send the response
        res.json(result);
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// Text to Speech / Narrate
app.post('/apps/openai-tts', async (req, res) => {
    try {
        let buffer = await speak(req.body.userInput, req.body.voiceID); // Call the speak function
        res.set({
            'Content-Type': 'audio/mp3',
            'Content-Length': buffer.length
        });
        res.send(buffer)
    } catch (error) {
        // Handle errors here, provide informative responses to the client
        res.status(500).send('Error processing request');
    }
});

// Speech To Text / Listen
app.post('/apps/openai-stt', async (req, res) => {
    try {
        let {file} = req.body;
        let buffer = await listen(); // Call the speak function
        res.send(buffer)
    } catch (error) {
        // Handle errors here, provide informative responses to the client
        res.status(500).send('Error processing request');
    }
});


//Starting your http server
app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
