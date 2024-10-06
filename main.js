// Civilization data
let civilizationData = [
    { 
        landUsed: '1%', 
        population: 1, 
        maxPopulation: 100, 
        totalFood: 1, 
        foodProductionRate: 10, 
        nextPopulationReq: 110,
        sheltersBuilt: 0, // Field for counting shelters
        farmBuilt: 0, // Field for counting farms
        foodConsumptionRate: 1 // Food consumed per person per tick
    },
    { 
        landUsed: '20%', 
        population: 100000000, 
        maxPopulation: 500000, 
        totalFood: 100000000, 
        foodProductionRate: 500000, 
        nextPopulationReq: 500000000,
        sheltersBuilt: 0,
        farmBuilt: 0,
        foodConsumptionRate: 1
    },
    { 
        landUsed: '30%', 
        population: 2000, 
        maxPopulation: 2000000, 
        totalFood: 2000000, 
        foodProductionRate: 2000000, 
        nextPopulationReq: 1000000000,
        sheltersBuilt: 0,
        farmBuilt: 0,
        foodConsumptionRate: 1
    },
    { 
        landUsed: '40%', 
        population: 5000, 
        maxPopulation: 5000000, 
        totalFood: 5000000, 
        foodProductionRate: 5000000, 
        nextPopulationReq: 5000000000,
        sheltersBuilt: 0,
        farmBuilt: 0,
        foodConsumptionRate: 1
    },
    // Add more civilizations as needed
];

let currentCivilizationIndex = 0;
let availableLand = 100; // Percentage of available land
let foodProduction = 0;
let populationGrowthInterval;
let totalDeaths = 0; // Track total deaths due to starvation

// Function to update the displayed status
function updateStatus() {
    const currentCivilization = civilizationData[currentCivilizationIndex];

    document.getElementById('landUsed').innerText = currentCivilization.landUsed;
    document.getElementById('currentPopulation').innerText = Math.round(currentCivilization.population);
    document.getElementById('maxPopulation').innerText = Math.round(currentCivilization.maxPopulation);
    document.getElementById('totalFood').innerText = Math.round(currentCivilization.totalFood);
    document.getElementById('foodProductionRate').innerText = Math.round(currentCivilization.foodProductionRate);
    document.getElementById('foodConsumptionRate').innerText = currentCivilization.foodConsumptionRate; // Update food consumption rate
    document.getElementById('nextPopulationReq').innerText = Math.round(currentCivilization.nextPopulationReq);
    document.getElementById('mortalityRate').innerText = calculateMortalityRate();
    document.getElementById('birthRate').innerText = calculateBirthRate();

    // Update food production based on population and food production rate
    foodProduction = currentCivilization.foodProductionRate;
}

// Function to calculate the birth rate based on the number of shelters
function calculateBirthRate() {
    const currentCivilization = civilizationData[currentCivilizationIndex];
    const birthRate = Math.round(currentCivilization.sheltersBuilt * 10); // Example: 10 births per shelter built per year
    console.log(`Birth Rate Calculation: Shelters Built: ${currentCivilization.sheltersBuilt}, Birth Rate: ${birthRate}`);
    return birthRate;
}

// Function to calculate the mortality rate based on food and population
function calculateMortalityRate() {
    const currentCivilization = civilizationData[currentCivilizationIndex];
    
    // If population is zero, prevent division by zero
    if (currentCivilization.population === 0) {
        return 0;
    }
    
    // Calculate excess population and mortality based on food shortages
    const excessPopulation = Math.max(0, currentCivilization.population - currentCivilization.totalFood);
    
    // Calculate mortality rate as a percentage of the population
    const mortalityRate = Math.round((excessPopulation / currentCivilization.population) * 100) + Math.round(currentCivilization.population * 0.05);
    console.log(`Mortality Rate Calculation: Population: ${currentCivilization.population}, Total Food: ${currentCivilization.totalFood}, Mortality Rate: ${mortalityRate}`);
    return mortalityRate;
}

// Function to handle building a shelter
function buildShelter() {
    const currentCivilization = civilizationData[currentCivilizationIndex];

    // Increase max population, decrease available land
    if (availableLand > 5) {
        currentCivilization.maxPopulation += 10; // Example increment
        currentCivilization.sheltersBuilt += 1; // Increment shelter count
        availableLand -= 5; // Decrease land availability
        currentCivilization.landUsed = `${100 - availableLand}%`;
        updateStatus();
    } else {
        alert("Not enough land!");
    }
}

// Function to handle building a farm
function buildFarm() {
    const currentCivilization = civilizationData[currentCivilizationIndex];
    
    if (availableLand > 5) {
        // Increase food production rate, decrease available land
        currentCivilization.foodProductionRate += 500; // Example increment
        availableLand -= 5; // Decrease land availability
        currentCivilization.landUsed = `${100 - availableLand}%`;
        updateStatus();
    } else {
        alert("Not enough land!");
    }
}

// Function to transition to the next civilization
function nextCivilization() {
    if (currentCivilizationIndex < civilizationData.length - 1) {
        const currentCivilization = civilizationData[currentCivilizationIndex];

        // Check if the current population meets the requirement to advance
        if (currentCivilization.population >= currentCivilization.nextPopulationReq) {
            currentCivilizationIndex++;
            updateStatus();
        } else {
            // Add the nextPopulationReq to the alert message
            alert("You need more humans to advance to the next civilization! Current population: " + currentCivilization.population + " Required population: " + currentCivilization.nextPopulationReq);
        }
    } else {
        alert("You have reached the last civilization!");
    }
}

// Function to start the game and initiate population growth
function beginGame() {
    // Clear any existing intervals
    clearInterval(populationGrowthInterval);
    totalDeaths = 0; // Reset total deaths at the start of the game
    
    // Start increasing the population over time
    populationGrowthInterval = setInterval(() => {
        const currentCivilization = civilizationData[currentCivilizationIndex];
        
        // Calculate the number of new humans based on food and shelters
        let newPopulation = Math.min(currentCivilization.foodProductionRate / 1000, currentCivilization.maxPopulation - currentCivilization.population);
        
        // Increase population by the number of new humans
        currentCivilization.population += newPopulation;

        // Calculate the number of new births based on the birth rate
        const births = calculateBirthRate(); 
        currentCivilization.population += births; // Add births to population

        // Calculate food consumption
        let foodConsumption = currentCivilization.population * currentCivilization.foodConsumptionRate; // Total food consumed by population
        currentCivilization.totalFood -= foodConsumption; // Deduct food consumed

        // Add new food produced by the food production rate
        currentCivilization.totalFood += currentCivilization.foodProductionRate; // New food produced

        // Check if there is enough food for the current population
        if (currentCivilization.population > currentCivilization.totalFood) {
            const excessPopulation = Math.abs(currentCivilization.population - currentCivilization.totalFood);
            currentCivilization.population -= excessPopulation; // Reduce population based on excess
            totalDeaths += excessPopulation; // Track total deaths
        }

        // Log the birth and mortality rates to the console
        console.log(`Birth Rate: ${births}, Mortality Rate: ${calculateMortalityRate()}`);
        
        updateStatus();
    }, 1000); // Adjust interval time as needed (currently every second)
}

// Event listeners for buttons
document.getElementById('beginGameBtn').addEventListener('click', beginGame);
document.querySelector('.build-btn:nth-child(1)').addEventListener('click', buildShelter);
document.querySelector('.build-btn:nth-child(2)').addEventListener('click', buildFarm);
document.querySelector('.next-btn').addEventListener('click', nextCivilization);

// Initial status update
updateStatus();
