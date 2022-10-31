import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../keys.js'

export const verify = (req,res,next) =>{
    const {authorization} = req.headers

    if(!authorization) return res.status(401).json({error:"you must me logged in"})
    const token=authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err) return res.status(401).json({error:"you must me logged in"})
        const {id} =payload
        User.findById(id)
        .then(userData=>{
            req.user = userData
            next()
        })
    })
}
