import express from 'express';
import serverless from "serverless-http";

const app = express();

app.get("/hello", (req, res) => {
    res.json({message: "From express running on Netlify"});
});

export const handler = serverless(app);