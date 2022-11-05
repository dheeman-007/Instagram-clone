import express from 'express'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../keys.js'
import { verify } from '../middleware/requireLogin.js'

const router=express.Router()

router.get('/',(req,res)=>{
    res.send('hello')
})


router.post('/signup', (req,res)=>{
    const {name,email,password,pic} =req.body
    if(!email || !password || !name){
        return res.status(422).json({error:"please add all fields"})
    }
    const hash = bcrypt.hashSync(password, 8);
    
    User.findOne({email:email}, async function(err,obj) {
        if(obj) return res.status(422).json({error:"User already exists with this email"})
        try{
            const user = await User.create({
                name:name,
                email:email,
                password:hash,
                profilepic:pic
            })
            res.status(200).json(user);
        }catch(err){
            console.log(err)
        }
    });
})


router.post('/login',(req,res)=>{
    const {email,password} =req.body
    if(!email || !password){
        return res.status(422).json({error:"please add all fields"})
    }
    User.findOne({email:email}, async function(err,obj) {
        if(!obj) return res.status(422).json({error:"Invalid email"})
        bcrypt.compare(password,obj.password)
        .then(match=>{
            if(match){
                const token=jwt.sign({id:obj._id},JWT_SECRET)
                const {_id,name,email,followers,following,profilepic} = obj
                res.status(200).json({token,user:{_id,name,email,followers,following,profilepic}})
            }
            else return res.status(422).json({error:"Invalid email or password"})
        })
        .catch(err=>{
            console.log(err)
        })
    });
    
})

export default router