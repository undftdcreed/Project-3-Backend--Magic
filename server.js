///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 4000
const { PORT = 4000 } = process.env;
// import express
const express = require("express");
const axios = require("axios");
const morgan = require("morgan");

//middleware
// app.use(cors());
// app.use(morgan("dev"));
// app.use(express.json());


// create application object
const app = express();

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/cards", async (req, res) => {
    try {
        const response = await axios.get('https://api.magicthegathering.io/v1/cards');
        const cards = response.data.cards;
        res.json(cards);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server ERror'});
    }
});

app.get('/cards/search', async (req, res) => {
    try {
        const {name, colors, type } = req.query;
        //create an object to hold the search parameters
        const searchParams = {};
    
        //add search parameters if they are provided
        if (name) searchParams.name = name;
        if (colors) searchParams.name = colors;
        if (type) searchParams.type = type;

        //send the search parameters as query parameters to the MTG api
        const response = await axios.get('https://api.magicthegathering.io/v1/cards', {
        params: searchParams
    });
    const cards = response.data.cards;
    res.json(cards);
}   catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error"});
}
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
