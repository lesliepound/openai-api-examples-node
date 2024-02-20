// server.js
import express from 'express';
import bodyParser from 'body-parser';

// importing modules for each API example
import viz from "./src/modules/visual.js";
import main from './src/modules/chat.js';
import speak from "./src/modules/tts.js";
import listen from "./src/modules/stt.js";
import runConversation from "./src/modules/functions.js";
import moderateText from "./src/modules/moderation.js";

const app = express();

// Setting up local environment
const port = 3000;
const host = 'localhost';

// Setting up middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setting up Routes **

// Chat, FewShot, Tempature API
app.post('/apps/openai-chat', async (req, res) => {
    const temp = (req.body.temp)? parseInt(req.body.temp) : 1.0;  // some demos use tempature
    console.log('----',req.body.temp)
    try {
        const results = await main(req.body.prompt,temp); // Call main with user input
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing request');
    }
});

// Chat API  --- with prompt training
app.post('/apps/openai-fewshot', async (req, res) => {
    try {
        //let prompt = req.body.prompt; // Extract user input from request body
        //console.log('-------------',req.body.prompt)
        const results = await main(req.body.prompt,.9); // Call main with user input
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing request');
    }
});

// Visual API
app.post('/apps/openai-visual', async (req, res) => {
    try {
        let {userInput} = req.body;
        const results = await viz();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing request');
    }
});

// Functions
app.post('/apps/openai-funcs', async (req, res) => {
    try {
        let {userInput} = req.body; // Extract user input from request body
        const results = await runConversation(userInput);
        res.json(results);
    } catch (error) {
        res.status(500).send('Error processing request');
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

// Moderation API
app.post('/apps/openai-moderation', async (req, res) => {
    try {
        let prompt = req.body.prompt; // Extract user input from request body
        const results = await moderateText(prompt); // Call main with user input
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing request');
    }
});

//Starting your http server
app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
