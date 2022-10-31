import express from "express";
import mongoose from "mongoose";
import { MONGOURI } from "./keys.js";
import auth from './routes/auth.js'
import post from './routes/post.js'

const app = express();
const PORT = 5000;

app.use(express.json())

try {
    await mongoose.connect(MONGOURI);
    console.log("connected to MONGO DB");
} catch (error) {
    console.log("Not connected to MONGO DB");
}

app.use(auth)
app.use(post)

app.listen(PORT, () => {
    console.log("server is runnning on port : ", PORT);
});