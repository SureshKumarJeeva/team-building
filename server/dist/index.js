"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const cors = require('cors');
const secretSanta = require("./SecretSanta/SecretSanta");
const multer_file = require('multer');
const PORT = "8080";
app.use(cors());
const upload = multer_file({ storage: multer_file.memoryStorage() });
app.post("/api/secretsanta", upload.single("file"), (req, res) => {
    try {
        //check if user uploaded a file
        if (!req.file) {
            return res.status(400).json({ message: "File not uploaded" });
        }
        const secretSanta_game = new secretSanta(req.file);
        let msg = organizeGame(secretSanta_game);
        res.json({ message: msg });
    }
    catch (err) {
        console.log("Error while processing the home request" + err.message);
    }
});
app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
});
function organizeGame(g) {
    try {
        return g.organize();
    }
    catch (err) {
        console.log("Error while organizing a game" + err.message);
    }
}
