let civilizationData = [
    { name: "Stone", nextPopulationReq: 1000, crop: "potato" },
    { name: "Bronze", nextPopulationReq: 3000, crop: "tomato" },
    { name: "Iron", nextPopulationReq: 6000, crop: "rice" },
    { name: "Classical", nextPopulationReq: 10000, crop: "potato3" },
    { name: "Medieval", nextPopulationReq: 20000, crop: "chips" },
];

let currentCivilizationIndex = 0;
let maxPopulation = 100;
let currentPopulation = 100;
let totalFood = 100;
let foodProductionRate = 90;

let totalLand = 10000;
let unusableLand = 5000;
let usableLand = 5000;
let farmableLand = 0;
let livableLand = currentPopulation;
let naturalDeathRate = 0.07;
let growthRateBasedOnExcessFood = 0.40;

let availableCrops = ['<option value="" selected>potato</option></select>'];

function updateStatus() {
    const currentCivilization = civilizationData[currentCivilizationIndex];
    document.getElementById('civilization').innerText = currentCivilization.name;
    document.getElementById('landUsed').innerText = (livableLand + farmableLand) / totalLand;
    document.getElementById('unuseableLand').innerText = unusableLand / totalLand;
    document.getElementById('currentPopulation').innerText = currentPopulation;
    document.getElementById('maxPopulation').innerText = maxPopulation;
    document.getElementById('totalFood').innerText = totalFood;
    document.getElementById('foodProductionRate').innerText = foodProductionRate;
    document.getElementById('nextPopulationReq').innerText = currentCivilization.nextPopulationReq;
    document.getElementById("select-crop").innerHTML = availableCrops.join();
}

function setup() {
    document.querySelector('.build-shelter').addEventListener('click', () => {
        maxPopulation += 10;
        livableLand += 10;
        document.getElementById('maxPopulation').innerText = maxPopulation;
    });
    document.querySelector('.build-farm').addEventListener('click', () => {
        foodProductionRate += 10;
        farmableLand += 10;
        document.getElementById('foodProductionRate').innerText = foodProductionRate;
    });

    document.querySelector('.next-gen').addEventListener('click', () => {
        if (currentCivilizationIndex < civilizationData.length - 1) {
            currentCivilizationIndex++;
            availableCrops.push("<option value='' selected>" + civilizationData[currentCivilizationIndex].crop + "</option>");
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
    if (newPopulation >= maxPopulation && newPopulation < 0) {
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
    totalFood += (foodProductionRate - oldPopulation);

    document.getElementById('totalFood').innerText = totalFood;
    document.getElementById('foodProductionRate').innerText = foodProductionRate;
}


// Initial status update
setup();
updateStatus();

// Setup Game Loop
setInterval(loop, 1000);

