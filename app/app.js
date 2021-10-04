const express = require("express");
const axios = require("axios").default;

const app = express();
const SERVER_PORT = 3000;
const HEAVY_TIMEOUT = 5000;

app.get("/", (req, res) => {
    res.status(200).send("Greetings from La Covideira!\n")
});

app.get("/ping", (req, res) => {
    res.status(200).send("You've got yourself a ping!\n")
});

app.get("/heavy", (req, res) => {
    for(let start = new Date(); new Date() - start < HEAVY_TIMEOUT; ) {
    }
    res.status(200).send('Heavy duty ended!\n')
});

app.get("/bbox/1", (req, res) => {
    axios.get('http://bbox:9090/')
        .then((response) => res.status(response.status).send(response.data + "\n"))
        .catch((error) => console.log(error));
});

app.get("/bbox/2", (req, res) => {
    axios.get('http://bbox:9091/')
        .then((response) => res.status(response.status).send(response.data + "\n"))
        .catch((error) => console.log(error));
});

app.listen(SERVER_PORT, () => {
    console.log(`HTTP server started at port ${SERVER_PORT}.\n`);
});