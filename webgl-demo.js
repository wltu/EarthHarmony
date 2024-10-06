const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let soilQuality = 100;
let resources = 100;
let conservationLevel = 0;
let challengeEffect = 0;

const challenges = [
    "Drought",
    "Flooding",
    "Invasive Species",
    "Soil Erosion"
];

function displayStatus() {
    document.getElementById('soilQuality').innerText = `Soil Quality: ${soilQuality}`;
    document.getElementById('resources').innerText = `Resources: ${resources}`;
    document.getElementById('conservationLevel').innerText = `Conservation Level: ${conservationLevel}`;
}

function manageResources(action) {
    if (action === 'invest') {
        if (resources >= 10) {
            conservationLevel += 1;
            resources -= 10;
            displayStatus();
            displayChallenge();
        } else {
            alert("Not enough resources!");
        }
    } else if (action === 'analyze') {
        if (resources >= 5) {
            soilQuality += 5;
            resources -= 5;
            displayStatus();
            if (resources < 50) {
                document.getElementById('testBtn').style.visibility = 'hidden';
            }
        } else {
            alert("Not enough resources!");
        }
    }
}

function displayChallenge() {
    const challenge = challenges[challengeEffect % challenges.length];
    let challengeMessage = `You encounter a challenge: ${challenge}`;

    if (challenge === "Drought") {
        soilQuality -= 20;
    } else if (challenge === "Flooding") {
        soilQuality -= 15;
    } else if (challenge === "Invasive Species") {
        soilQuality -= 10;
    } else if (challenge === "Soil Erosion") {
        soilQuality -= 5;
    }

    resources += 5; // Gain resources for facing the challenge
    challengeEffect += 1;

    document.getElementById('challengeMessage').innerText = challengeMessage;
    displayStatus();
}

document.getElementById('investBtn').addEventListener('click', () => manageResources('invest'));
document.getElementById('analyzeBtn').addEventListener('click', () => manageResources('analyze'));
document.getElementById('endGameBtn').addEventListener('click', () => {
    alert("Ending game...");
    window.close(); // Close the window
});

document.getElementById('testBtn').style.visibility = 'visible';
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw simple soil representation
    ctx.fillStyle = 'saddlebrown';
    ctx.fillRect(0, canvas.height - (soilQuality * 3), canvas.width, canvas.height);
    requestAnimationFrame(draw);
}

draw();
displayStatus();
