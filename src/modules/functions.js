import OpenAI from "openai";
const openai = new OpenAI();


function makeAdviceFeelings(feeling) {
console.log("-----;-;;-;-", feeling)
    console.log(" Feeling?")
       // return JSON.stringify({ feeling: feeling });
    return " cows";


}
//When openAI finds user prompts with greeetings, it calls this.
function greetMe(salutation, extra = "dude", function_name = "greetMe") {

    if (salutation && salutation.toLowerCase().includes("morning") || salutation.toLowerCase().includes("day")) {
        return JSON.stringify({salutation: salutation, function_name: function_name });
    }
    else if (salutation && salutation.toLowerCase().includes("evening") || salutation.toLowerCase().includes("night")) {
        return JSON.stringify({salutation: salutation, function_name: function_name });
    }
    return JSON.stringify({salutation: salutation, function_name:function_name});


}
// Example dummy function hard coded to return the same weather
// In production, this could be your backend API or an external API
function getCurrentWeather(location, unit = "fahrenheit") {

    if (location.toLowerCase().includes("tokyo")) {
        return JSON.stringify({ location: "Tokyo", temperature: "10", unit: "celsius" });
    } else if (location.toLowerCase().includes("san francisco")) {
        return JSON.stringify({ location: "San Francisco", temperature: "72", unit: "fahrenheit" });
    } else if (location.toLowerCase().includes("paris")) {
        return JSON.stringify({ location: "Paris", temperature: "22", unit: "fahrenheit" });
    } else {
        return JSON.stringify({ location, temperature: "unknown" });
    }
}


async function runConversation(userInput) {
    const userQuery = userInput.toString
    // Step 1: send the conversation and available functions to the model
    const messages = [
        { role: "system", content: "You are an online demo system. you will return answers but also the specifics of code with a function name"},
        { role: "user", content: "\"" +userInput +"\""},
    ];
    const tools = [
        {
            type: "function",
            function: {
                name: "get_gems_info",
                description: "Tell me about stones and gems",
                parameters: {
                    type: "object",
                    properties: {
                        stone: {
                            type: "string",
                            description: "Stone, gems or other rocks",
                        }
                    },
                    required: ["stone"],
                },
            },
        },
        {
            type: "function",
            function: {
                name: "hear_emotions",
                description: "Be empathetic and give advice for feelings. This function name is hear_emotions",
                parameters: {
                    type: "object",
                    properties: {
                        feeling: {
                            type: "string",
                            description: "an feeling or state of being",
                        }

                    },
                    required: ["feeling"],
                },
            },
        },
        {
            type: "function",
            function: {
                name: "greet_me",
                description: "Greet the user. This function is greet_me  ",
                parameters: {
                    type: "object",
                    properties: {
                        saluation: {
                            type: "string",
                            description: "salutation",
                        }

                    },
                    required: ["saluation"],
                },
            },
        }

    ];


    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: messages,
        tools: tools,
        tool_choice: "auto", // auto is default, but we'll be explicit
    });

    const functionName = (response.choices[0].message.tool_calls[0].function.name ) ? response.choices[0].message.tool_calls[0].function.name : "nothing";
    const responseMessage = response.choices[0]
    //console.log("foo", messages," what is this ", functionName)
    return response.choices[0].message.tool_calls[0].function
      //         const functionName = toolCall.function.name;
    //         const functionToCall = availableFunctions[functionName];
    //         const functionArgs = JSON.parse(toolCall.function.arguments);

    //     const secondResponse = await openai.chat.completions.create({
    //         model: "gpt-3.5-turbo-1106",
    //         messages: messages,
    //         tools: tools,
    //         tool_choice: "auto",
    //     }); // get a new response from the model where it can see the function response
    //     console.log("second:",secondResponse)
    //     return secondResponse
   // }
}


//runConversation();
export default runConversation

//runConversation().then(console.log).catch(console.error);