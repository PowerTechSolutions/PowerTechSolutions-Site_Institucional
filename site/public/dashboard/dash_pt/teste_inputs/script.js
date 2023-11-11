const numberInput = document.getElementById('number');
const addDivsButton = document.getElementById('addDivs');
const divContainer = document.getElementById('divContainer');

addDivsButton.addEventListener('click', () => {
    const numberOfDivs = parseInt(numberInput.value);

    if (!isNaN(numberOfDivs) && numberOfDivs > 0) {
        // Clear existing divs
        divContainer.innerHTML = '';

        // Create and append new divs
        for (let i = 0; i < numberOfDivs; i++) {
            const newDiv = document.createElement('div');
            newDiv.classList.add('form-div');
            newDiv.innerHTML = `
                <h3>Form ${i + 1}</h3>
                <label for="name${i}">Name:</label>
                <input type="text" id="name${i}" name="name">
                <label for="age${i}">Age:</label>
                <input type="number" id="age${i}" name="age">
            `;
            divContainer.appendChild(newDiv); // Append the new div to the container
        }
    }
});


const input_disco = document.getElementById('input_disco');
const disc1 = document.getElementById('disc1');
const disc_1 = document.getElementById('disc_1');

disc1.addEventListener('click', () => {
    const numberOfDivs = parseInt(input_disco.value);

    if (!isNaN(numberOfDivs) && numberOfDivs > 0) {
        // Clear existing divs
        disc_1.innerHTML = '';

        // Create and append new divs
        for (let i = 0; i < numberOfDivs; i++) {
            const newDiv = document.createElement('div');
            newDiv.classList.add('form-div');
            newDiv.innerHTML = `
                <h3>Form ${i + 1}</h3>
                <label for="name${i}">Name:</label>
                <input type="text" id="name${i}" name="name">
                <label for="age${i}">Age:</label>
                <input type="number" id="age${i}" name="age">
            `;
            disc_1.appendChild(newDiv); // Append the new div to the container
        }
    }
});


