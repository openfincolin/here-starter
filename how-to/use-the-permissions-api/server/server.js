
const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
    console.log('App is listening on port 3000.');
    console.log("Please open your browser and navigate to http://localhost:3000")
})