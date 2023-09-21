const express = require("express");
const router = express.Router();
const set = require("./set");

router.post("/", async (req, res) => {
    try {
        const result = await set.factoryCreatetx(req, res);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});

module.exports = router;
