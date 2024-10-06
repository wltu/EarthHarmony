// triangle.js

export function initWebGL(canvas) {
    let gl = canvas.getContext("webgl");
    if (!gl) {
        console.error("WebGL not supported, falling back on experimental WebGL");
        gl = canvas.getContext("experimental-webgl");
    }
    return gl;
}

export function drawTriangle(gl) {
    // Define the vertices for a triangle
    const vertices = new Float32Array([
        0.0,  0.5,  // Vertex 1 (X, Y)
        -0.5, -0.5,  // Vertex 2 (X, Y)
        0.5, -0.5    // Vertex 3 (X, Y)
    ]);

    // Create a buffer for the triangle's vertices
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Define a vertex shader
    const vertexShaderSource = `
        attribute vec2 coordinates;
        void main(void) {
            gl_Position = vec4(coordinates, 0.0, 1.0);
        }
    `;

    // Define a fragment shader
    const fragmentShaderSource = `
        void main(void) {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red color
        }
    `;

    // Compile the shaders
    const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

    // Create a shader program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Bind the buffer and set the attributes
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    const coordinates = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coordinates, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coordinates);

    // Draw the triangle
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

// Compile shader helper function
function compileShader(gl, source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}
