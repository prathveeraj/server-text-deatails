# Manage Notes Server

A simple Node.js server to manage notes stored in a file.

## Installation

1. Ensure you have Node.js installed.
2. Run `npm install` to install dependencies.

## Running the Server

Run `npm start` to start the server on port 3000.

## API Routes

### Add a Note
- **GET** `/add?note=YourNoteHere`
- Extracts the `note` query parameter and appends it to `notes.txt`.
- Response: "Note Added Successfully"
- If `note` is missing: 400 Bad Request

### Get All Notes
- **GET** `/notes`
- Returns all notes from `notes.txt` as plain text.
- If no notes: "No Notes Found"

## Example Usage

- Add a note: `http://localhost:3000/add?note=Hello%20World`
- View notes: `http://localhost:3000/notes`

## Troubleshooting

- Ensure port 3000 is not in use.
- Check that `notes.txt` is writable.