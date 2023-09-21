const express = require("express");
const app = express()
app.use(express.json())
const set = require("./set"); 


app.post("/tx", async (req, res) => {

    try {
        const result = await set.factoryCreatetx(req,res)
        res.status(200).json(result)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

})
app.listen(9000, () => {
    console.log("lisconneted");
})