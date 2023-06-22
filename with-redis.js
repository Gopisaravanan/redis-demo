const express = require("express");
const axios = require("axios");
const redis = require("redis")

const app = express();

const PORT = 5000

const redisClient = redis.createClient();


redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.connect();

app.get("/", (req, res) => {
    res.send("Redis - Demos")
})



// with redis

app.get("/photos", async (req, res) => {
    const albumId = req.query.albumId;
    const cacheKey = `photos?albumId=${albumId}`;

    const value = await redisClient.get(cacheKey);
    if (value) {
        console.log("cache hit");
        res.json(JSON.parse(value));
    }
    else {
        console.log("cache miss");
        for (let i = 0; i < 1000000000; i++) { }
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/photos", { params: { albumId } });
        redisClient.set(cacheKey, JSON.stringify(data));
        res.send(data);
    }
});




app.listen(PORT, () => {
    console.log("server running")
})