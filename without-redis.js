const express = require("express");
const axios = require("axios");

const app = express();

const PORT = 5000



app.get("/", (req, res) => {
    res.send("Redis - Demos")
})

// without redis
app.get("/photos", async (req, res) => {
    const albumId = req.query.albumId;
    for (let i = 0 ; i < 1000000000 ; i++){}
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/photos", { params: { albumId } });
    res.send(data);
})





app.listen(PORT, () => {
    console.log("server running")
})