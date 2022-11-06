import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types
const { Schema } = mongoose;

const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    },
    likes:[{
        type:ObjectId,
        ref:"User"
    }],
    comments:[{
        text:{
            type:String,
        },
        postedBy:{
            type:ObjectId,
            ref:"User"
        }
    }]
},{timestamps:true});

export default mongoose.model("Post",postSchema)