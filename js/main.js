let civilizationData = [
    { name: "Stone Age", nextPopulationReq: 102 },
    { name: "Stage1", nextPopulationReq: 100000 },
];

let currentCivilizationIndex = 0;
let maxPopulation = 100;
let currentPopulation = 100;
let totalFood = 100;
let foodProductionRate = 0;

let totalLand = 10000;
let unusableLand = 5000;
let usableLand = 5000;
let farmableLand = 0;
let livableLand = 0;
let naturalDeathRate = 0.07;
let growthRateBasedOnExcessFood = 0.40;

function updateStatus() {
    const currentCivilization = civilizationData[currentCivilizationIndex];
    document.getElementById('civilization').innerText = currentCivilization.name;
    document.getElementById('landUsed').innerText = (livableLand + farmableLand) / totalLand;
    document.getElementById('currentPopulation').innerText = currentPopulation;
    document.getElementById('maxPopulation').innerText = maxPopulation;
    document.getElementById('totalFood').innerText = totalFood;
    document.getElementById('foodProductionRate').innerText = foodProductionRate;
    document.getElementById('nextPopulationReq').innerText = currentCivilization.nextPopulationReq;
}

function setup() {
    document.querySelector('.build-shelter').addEventListener('click', () => {
        maxPopulation += 10;
        document.getElementById('maxPopulation').innerText = maxPopulation;
    });
    document.querySelector('.build-farm').addEventListener('click', () => {
        document.querySelector('.select-crop').disabled = false;
    });

    document.querySelector('.next-gen').addEventListener('click', () => {
        if (currentCivilizationIndex < civilizationData.length - 1) {
            currentCivilizationIndex++;
            updateStatus();
        } else {
            alert("You have reached the last civilization!");
        }
    });
}

function calculateFoodProduction() {
    return 400;
}

function loop() {
    // Population Changes
    // Natural Deaths
    let oldPopulation = currentPopulation;
    let newPopulation = currentPopulation * (1 - naturalDeathRate);

    // Population is limited by the total food supply
    if (newPopulation > totalFood) {
        newPopulation = totalFood;
    } else {
        let diff = totalFood - newPopulation;
        newPopulation += growthRateBasedOnExcessFood * diff;
    }
    newPopulation = Math.max(Math.floor(newPopulation), 0);
    if (newPopulation >= maxPopulation && newPopulation > 0) {
        return;
    }

    currentPopulation = Math.min(newPopulation, maxPopulation);
    document.getElementById('currentPopulation').innerText = currentPopulation;
    if (currentCivilizationIndex < civilizationData.length) {
        const currentCivilization = civilizationData[currentCivilizationIndex];
        if (currentPopulation >= currentCivilization.nextPopulationReq) {
            document.querySelector('.next-gen').disabled = false;
        }
    }

    // Food Changes
    totalFood += foodProductionRate - oldPopulation;
    foodProductionRate = 400;
}


// Initial status update
setup();
updateStatus();

// Setup Game Loop
setInterval(loop, 1000);

