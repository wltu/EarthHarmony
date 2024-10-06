main();

function main() {
  const canvas = document.querySelector("#glcanvas");
  // Initialize the GL context
  const gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it.",
    );
    return;
  }

  // Set clear color to black, fully opaque
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw land
  drawLand();

  // Draw farms
  drawFarms();

  // Draw shelters
  drawShelters();

  // Draw population
  drawPopulation();

  // Update the stats on the screen
  updateStatsOnScreen();

  // Request to render the next frame
  requestAnimationFrame(render);
}


function drawPopulation() {
    const currentPopulation = civilizationData[currentCivilizationIndex].population;
    for (let i = 0; i < currentPopulation; i++) {
        // Calculate position based on population
        const position = calculatePopulationPosition(i);
        drawHumanModel(position);
    }
}

function drawHumanModel(position) {
    // Create a sphere at the given position
    // Create a cylinder for the body
    // Bind buffers and set attributes
    // Draw the model
}
