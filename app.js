const express = require("express");
const app = express();
app.use(express.json());

const router = require("./router"); // Import the router

app.use("/", router); // Use the router for the specified path ("/")

app.listen(9000, () => {
    console.log("lisconneted");
});
