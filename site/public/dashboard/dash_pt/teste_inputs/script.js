const numberInput = document.getElementById('number');
const ramButton = document.getElementById('ram');
const slider = document.getElementById('slider');

ramButton.addEventListener('click', () => {
    const numberOfDivs = parseInt(numberInput.value);

    if (!isNaN(numberOfDivs) && numberOfDivs > 0) {
        // Clear existing divs
        slider.innerHTML = '';

        // Create and append new divs
        for (let i = 0; i < numberOfDivs; i++) {
            const newDiv = document.createElement('div');
            newDiv.classList.add('info-div');
            newDiv.textContent = `Ram ${i + 1}`;
        }
    }
});


// ... (Previous JavaScript code)

const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');

let scrollPosition = 0;

leftButton.addEventListener('click', () => {
    scrollPosition -= 300; // Adjust this value to control the scrolling distance
    slider.style.transform = `translateX(${scrollPosition}px)`;
});

rightButton.addEventListener('click', () => {
    scrollPosition += 300; // Adjust this value to control the scrolling distance
    slider.style.transform = `translateX(${scrollPosition}px)`;
});
