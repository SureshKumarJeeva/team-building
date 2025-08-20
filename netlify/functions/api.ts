import express from 'express';
import serverless from "serverless-http";
const app = express();
const cors = require('cors');
const secretSanta = require("./SecretSanta/SecretSanta");
const multer_file = require('multer');
const fs = require("fs");
const csv = require("csv-parser");
const { Parser } = require('json2csv');

import { Request, Response } from "express";
const PORT = "8080";

app.use(cors());

const upload = multer_file({storage:multer_file.memoryStorage()});

app.post("/api/secretsanta", upload.single("file"), (req:Request, res:Response)=>{
    try{
        //check if user uploaded a file
        if(!req.file){
            return res.status(400).json({message: "File not uploaded"});
        }
        const secretSanta_game = new secretSanta(req.file);
        let response = organizeGame(secretSanta_game);

        const fields = ["Employee_Name", "Employee_EmailID", "Secret_Child_Name", "Secret_Child_EmailID"];
        const json2csvparser = new Parser({fields});
        const csv = json2csvparser.parse(response);

        res.header("Content-Type", 'text/csv');
        res.send(csv);

    }catch(err:any){
        res.status(400).json({message: "Error while processing the secretsanta Game: "+err.message});
    }
});
 
app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`);
});


//calling the organize function to initialize the organize function for any game
function organizeGame(g:Games){
    try{
        return g.organize();
    }catch(err:any){
        throw new Error(err.message);
    }
}

export const handler = serverless(app);