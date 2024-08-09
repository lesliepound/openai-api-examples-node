
let currentSlideIndex = 0;
let deckData = null;
let optionData = [];

//const propName = "nextSlideId";

//If this page has a specific nextSlide Index
function getForNextSlide(thisIndex) {
    console.log('g:',thisIndex,'-',deckData.pages[thisIndex].text)
    // if it has a nextSlideId  (first level)
    if (deckData.pages[thisIndex].hasOwnProperty("nextSlideId")) {
        console.log('h:',thisIndex,'-',deckData.pages[thisIndex].text)
        let thisID =deckData.pages[thisIndex].nextSlideId;
        let revisedIndex = deckData.pages.findIndex(page => page.id === thisID);

        return revisedIndex;
    }
    return null;
}

function findPageIndex(deckData, targetPageName) {
    const matchingIndex = deckData.pages.findIndex(page => page.id === targetPageName);
    return matchingIndex;
}

async function loadDeck() {
    const response = await fetch('/deck/story.json'); // Load story.json
    deckData = await response.json();
    document.getElementById("content").innerHTML = "<div>" +JSON.stringify(deckData) +"</div>"
    displayPage(currentSlideIndex); // Use index directly
}

function displayPage(index) {
    //need to reset index not on order of slides, but where it restarted
    const slide = deckData.pages[index];

    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';  // Clear previous content
    const slideTextDiv = document.createElement('div');
    slideTextDiv.className = 'slide';
    slideTextDiv.textContent = slide.text;

    if (slide.type === 'end') {
        contentDiv.appendChild(slideTextDiv);
        return
    }

    if (slide.type === 'story') {

        contentDiv.appendChild(slideTextDiv);
        setTimeout(() => {
            //  If theres a nextSlideId on timed sldie, go there
            let revisedIndex = getForNextSlide(index)
            if (revisedIndex)
                currentSlideIndex = revisedIndex
            else currentSlideIndex++
            console.log(index,'next is',currentSlideIndex)
            displayPage(currentSlideIndex);
        }, slide.timer * 1000);
    } else if (slide.type === 'options') {
        if (slide.options) {
            slide.options.forEach((optionObj, idx) => {
                console.log(optionObj.nextSlideId)
                const optionSpan = document.createElement('div');
                optionSpan.className = `option delay-${idx}`;
                optionSpan.textContent = optionObj.option;
                if (!slide.hasOwnProperty("display"))
                    slideTextDiv.appendChild(optionSpan);
                optionData.push({
                    option: optionObj.option,
                    nextSlideId: optionObj.nextSlideId
                });
            });
        }
        contentDiv.appendChild(slideTextDiv);
        currentSlideIndex++;
    }
}



//  Send voice to  matchIt
const inputText  = document.getElementById('input-text').value;
const outputText = document.getElementById('output-text');
const sendButton = document.getElementById('send-button');
// send -> app.js - > runconveration (functions.js)

sendButton.addEventListener('click', async () => {
    let prompt =  document.getElementById('input-text').value;

    try {
        const dataToSend = {
            prompt,
            options: optionData,
        };
        console.log('data to send',dataToSend) // Log the object, not the stringified version

        const response = await fetch('/apps/openai-funcs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend), // Stringify for sending
        });
        const result = await response.json();
         console.log('result', result.function.name);
        let indexOfPage = findPageIndex(deckData,result.function.name)
        displayPage(indexOfPage)

    } catch (error) {
        // ... (error handling)
    }

});
