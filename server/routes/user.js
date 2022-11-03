import express from 'express'
import Post from '../models/post.js'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../keys.js'
import { verify } from '../middleware/requireLogin.js'

const router=express.Router()


router.get('/user/:id',verify,(req,res)=>{
    User.findById(req.params.id)
    .select("-password")
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,post)=>{
            if(err) return res.status(422).json({error:err})
            res.status(200).json({user,post})
        })
    })
    .catch(err=>{
        return res.status(404).json({error:'User not found'})
    })
})






export default router