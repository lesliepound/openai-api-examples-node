let currentSlideIndex = 0;
let deckData = null;

async function loadDeck() {
    const response = await fetch('/story.json'); // Load story.json
    deckData = await response.json();
    displaySlide(currentSlideIndex); // Use index directly
}

function displaySlide(index) {
    const slide = deckData.pages[index];
    const contentDiv = document.getElementById('content');

    if (slide.type === 'story') {
        contentDiv.innerHTML = slide.content;

        // Automatically move to the next slide (or option)
        setTimeout(() => {
            currentSlideIndex++;
            displaySlide(currentSlideIndex);
        }, slide.timer * 1000);
    } else if (slide.type === 'options') {
        contentDiv.innerHTML = slide.content + '<br>';

        // Dynamically create buttons for each option
        slide.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.addEventListener('click', () => {
                // Transition to the slide with the corresponding ID
                currentSlideIndex = deckData.pages.findIndex(p => p.id === option.nextSlideId);
                displaySlide(currentSlideIndex);
            });
            contentDiv.appendChild(button);
        });
    }
}

loadDeck();
