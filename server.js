const http = require('http'); // Load the server tool
const fs = require('fs');     // Load the file tool

const server = http.createServer((req, res) => {
    
    // --- STEP 1: LOGGING THE VISIT ---
    // Create a simple timestamp
    const timestamp = new Date().toLocaleString(); 
    
    // This is the specific format you wanted:
    const logEntry = `${timestamp} - ${req.method} ${req.url}\n`;

    // Save this line into our logs.txt file
    fs.appendFile('logs.txt', logEntry, (err) => {
        if (err) {
            console.log("Error: Could not write to the file!");
        }
    });

    // --- STEP 2: SHOWING THE PAGES ---
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Home Page</h1><p>Welcome!</p>');

    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>About</h1><p>I am learning Node.js!</p>');

    } else if (req.url === '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Contact</h1><p>Call me maybe?</p>');

    } else {
        // This runs if the user types a URL that doesn't exist
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404</h1><p>Page not found!</p>');
    }
});

// --- STEP 3: START THE SERVER ---
const PORT = 6000;
server.listen(PORT, () => {
    console.log(`Server is running! Check it out at http://localhost:${PORT}`);
});