## OpenAI API Demos For Node 
### Simple web server for generative AI -OpenAI

This is a web server for multiple demos from OpenAI's Developer quickstart examples.

It was built with Node.js and uses the Express, FS, and, of course, the openAI APIs in node.

## Requirements


1. Download node [Node](https://nodejs.org/en/download/).

2. Clone this repository

3. Express  ```npm install express```  
_(installs node and npm)_

4. fs  ```npm install fs```

   _(installs file system access)_

5. Openai  ```npm install openai```

This repository contains demos from the OpenAI Developer quickstart for the APIs in

|                   Name | Modules         | endpoint              |
|-----------------------:|-----------------|-----------------------|
|                        | src/modules/... | http://localhost:3000 |
| text generation (chat) | chat.js         | /chat.html            |
|        prompt training | chat.js         | /fewshot.html         |
|              functions | functions.js    | /funcs.html           |
|                 vision | visual.js       | /visual.html          |
|                  speak | stt.js          | /stt.html             |
|                 listen | tts.js          | /tts.html             |
|             moderation | moderation.js   | /moderation.html      |


 This is a good place to start with building for generative AI applications.  Even if you don't plan to code, understanding how generative AI works is helpful in knowing what it is and what is possible.
 
We are headed toward programming in human language. This is a step in that direction. Not English, but simplier than other frameworks.



### Start
```cd <local_repo>```

```node app.js```