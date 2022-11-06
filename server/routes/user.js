import express from 'express'
import Post from '../models/post.js'
import User from '../models/user.js'
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


router.put('/follow',verify,(req,res)=>{
    User.findByIdAndUpdate(req.body.followingId,{
        $push:{followers:req.user._id}
    },{
        new:true
    })
    .exec((err,followed)=>{
        if(err) return res.status(422).json({error:err})
        User.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followingId}
        },{
            new:true
        })
        .select("-password")
        .exec((err,follower)=>{
            if(err) return res.status(422).json({error:err})
            return res.status(200).json({followed,follower})
        })
    })
})

router.put('/unfollow',verify,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowingId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    })
    .exec((err,followed)=>{
        if(err) return res.status(422).json({error:err})
        User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.unfollowingId}
        },{
            new:true
        })
        .select("-password")
        .exec((err,follower)=>{
            if(err) return res.status(422).json({error:err})
            return res.status(200).json({followed,follower})
        })
    })
})

router.put('/updateprofile',verify,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{profilepic:req.body.pic},{
        new:true
    })
    .select("-password")
    .exec((err,result)=>{
        if(err) return res.status(422).json({error:err})
        return res.status(200).json(result)
    })
})


router.post('/search',(req,res)=>{
    let userPattern=new RegExp("^"+req.body.query)
    User.find({email:{$regex:userPattern}})
    .select("_id email name profilepic")
    .exec((err,result)=>{
        if(err) return res.status(422).json({error:err})
        return res.status(200).json(result)
    })
})




export default router