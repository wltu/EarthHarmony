let civilizationData = [
    { landUsed: '10%', population: 100, maxPopulation: 100000, totalFood: 100000, foodProductionRate: 100000, nextPopulationReq: 100000000 },
    { landUsed: '20%', population: 500, maxPopulation: 500000, totalFood: 500000, foodProductionRate: 500000, nextPopulationReq: 500000000 },
    { landUsed: '30%', population: 2000, maxPopulation: 2000000, totalFood: 2000000, foodProductionRate: 2000000, nextPopulationReq: 1000000000 },
    // Add more civilizations as needed
];

let currentCivilizationIndex = 0;

function updateStatus() {
    const currentCivilization = civilizationData[currentCivilizationIndex];

    document.getElementById('landUsed').innerText = currentCivilization.landUsed;
    document.getElementById('currentPopulation').innerText = currentCivilization.population;
    document.getElementById('maxPopulation').innerText = currentCivilization.maxPopulation;
    document.getElementById('totalFood').innerText = currentCivilization.totalFood;
    document.getElementById('foodProductionRate').innerText = currentCivilization.foodProductionRate;
    document.getElementById('nextPopulationReq').innerText = currentCivilization.nextPopulationReq;
}

document.querySelector('.next-btn').addEventListener('click', () => {
    if (currentCivilizationIndex < civilizationData.length - 1) {
        currentCivilizationIndex++;
        updateStatus();
    } else {
        alert("You have reached the last civilization!");
    }
});

// Initial status update
updateStatus();
