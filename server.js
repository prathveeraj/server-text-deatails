const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 4000;
const FILE_PATH = 'notes.txt';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // 1. Route: GET /add?note=YourNoteHere
    if (pathname === '/add' && req.method === 'GET') {
        const note = parsedUrl.query.note;

        if (!note) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            return res.end('400 Bad Request: Missing note parameter');
        }

        // Append note to file with a new line
        fs.appendFile(FILE_PATH, note + '\n', (err) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error writing to file');
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Note Added Successfully');
        });
    }

    // 2. Route: GET /notes
    else if (pathname === '/notes' && req.method === 'GET') {
        // Check if file exists first
        if (!fs.existsSync(FILE_PATH)) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            return res.end('No Notes Found');
        }

        fs.readFile(FILE_PATH, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error reading file');
            }

            if (data.trim().length === 0) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('No Notes Found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        });
    }

    // Default 404 for other routes
    else {
        res.writeHead(404);
        res.end('Route Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});