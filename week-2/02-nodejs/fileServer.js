/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Task 1
app.get('/files', function(req, res) {
  let dirPath = './files';
  fs.readdir(dirPath, (err, data) => {
    if(err) {
      console.log(`Error occurred while reading ${dirPath}:`, err);
      return res.status(500).json({error: `Error occurred while reading ${dirPath}: ` + err})
    }
    else {
      return res.status(200).json({files: data});
    }
  })
})

// Task 2
app.get("/file/:filename", function(req, res) {
  // Get the filename from the URL parameters
  const filename = req.params.filename;
  // Create the full file path using the base directory and the filename
  const filePath = path.join("./files", filename);
  // Check if the file exists
  if(fs.existsSync(filePath)) {
    return (fs.readFile(filePath, "utf-8", function(err, data) {
      if(err) {
        console.log(`Error occurred while reading ${filePath}:`, err);
      }
      else {
        return res.status(200).send(data);
      }
    }));
  }
  else {
    return res.status(404).send("File not found"); // File not found
  }
})

app.get("*", function(req, res) {
  return res.status(404).send("Route not found");
})

app.listen(4000);

module.exports = app;