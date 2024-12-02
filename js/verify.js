
const carousel = document.querySelector('.carousel');
const prevArrow = document.querySelector('.arrow-left');
const nextArrow = document.querySelector('.arrow-right');
const modelsContainer = document.querySelector('.models');
const yearDropdown = document.querySelector('#year-dropdown');
const statusDropdown = document.querySelector('#status-dropdown');
const submitBtn = document.querySelector('#submit-btn');
const resultCard = document.querySelector('#result-card');
const resultTitle = document.querySelector('#result-title');
const resultMessage = document.querySelector('#result-message');

// Car models for each brand
const carModels = {
    Ferrari: ['488 Spider', '812 Superfast', 'SF90 Stradale'],
    Lamborghini: ['Aventador', 'Huracán', 'Urus'],
    Porsche: ['911 Carrera', 'Panamera', 'Cayenne'],
    Mercedes: ['AMG GT', 'S-Class', 'E-Class'],
    Bugatti: ['Chiron', 'Divo', 'Veyron'],
    Tesla: ['Model S', 'Model X', 'Cybertruck'],
    BMW: ['M3', 'i8', 'X5'],
};

let selectedBrand = '';
let selectedModel = '';
let selectedYear = '';
let selectedStatus = '';

// Handle brand selection
carousel.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        selectedBrand = e.target.alt;
        loadCarModels(selectedBrand);
    }
});

// Load car models dynamically
function loadCarModels(brand) {
    modelsContainer.innerHTML = ''; // Clear previous models
    const models = carModels[brand];
    if (models) {
        models.forEach((model) => {
            const modelDiv = document.createElement('div');

            // Create an image for each model
            const modelImg = document.createElement('img');
            modelImg.src = `images/${model.replace(/ /g, '-')}.png`;  // Assuming model images are named like '488-spider.jpg'
            modelImg.alt = model;
            modelImg.classList.add('model-img'); // Add a class for styling

            modelDiv.appendChild(modelImg);

            modelDiv.addEventListener('click', () => {
                // Remove highlight from other models
                const allModels = document.querySelectorAll('.models div');
                allModels.forEach((m) => m.classList.remove('selected'));

                // Highlight selected model with a red border
                modelDiv.classList.add('selected');
                selectedModel = model;
            });

            modelsContainer.appendChild(modelDiv);
        });
    }
}

// Handle form submission
submitBtn.addEventListener('click', () => {
    selectedYear = yearDropdown.value;
    selectedStatus = statusDropdown.value;

    if (selectedBrand && selectedModel && selectedYear && selectedStatus) {
        if (selectedStatus === 'new') {
            showResult(true);
        } else {
            showResult(false);
        }
    } else {
        alert('Please complete all steps!');
    }
});

// Show result
function showResult(isSuccess) {
    const overlay = document.getElementById('overlay');
    resultCard.classList.remove('hidden', 'success', 'failure', 'visible');

    if (isSuccess) {
        resultCard.classList.add('success');
        resultTitle.textContent = 'Verification Successful!';
        resultMessage.textContent = 'Your car is in perfect condition for the race!';
    } else {
        resultCard.classList.add('failure');
        resultTitle.textContent = 'Verification Failed';
        resultMessage.textContent = 'Sorry, your car does not meet the requirements.';
    }

    overlay.style.display = 'block';
    resultCard.classList.add('visible');
}
function closePopup() {
    const overlay = document.getElementById('overlay');
    resultCard.classList.remove('visible');
    overlay.style.display = 'none';
}

// Add event listener for closing the popup
document.getElementById('overlay').addEventListener('click', closePopup);

let scrollAmount = 0; // Initial scroll amount

prevArrow.addEventListener('click', () => {
    scrollAmount -= 250; // Adjust this value for how much you want to scroll
    carousel.style.transform = `translateX(${scrollAmount}px)`;
});

nextArrow.addEventListener('click', () => {
    scrollAmount += 250; // Adjust this value for how much you want to scroll
    carousel.style.transform = `translateX(${scrollAmount}px)`;
});