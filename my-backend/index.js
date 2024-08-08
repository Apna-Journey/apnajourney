const express = require('express');
const {connectToMongoDB} = require('./db.js');

const app = express();
const PORT = 5000; 

connectToMongoDB();

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});