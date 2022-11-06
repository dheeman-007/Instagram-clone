import express from "express";
import mongoose from "mongoose";
import  {MONGOURI} from "./config/keys.js";
import auth from './routes/auth.js'
import post from './routes/post.js'
import user from './routes/user.js'
import * as path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())

try {
    await mongoose.connect(MONGOURI);
    console.log("connected to MONGO DB");
} catch (error) {
    console.log("Not connected to MONGO DB");
}

app.use(auth)
app.use(post)
app.use(user)

if(process.env.NODE_ENV==="production"){
    app.use(express.static('client/build'))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT, () => {
    console.log("server is runnning on port : ", PORT);
});