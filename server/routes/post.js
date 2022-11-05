import express from 'express'
import Post from '../models/post.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../keys.js'
import { verify } from '../middleware/requireLogin.js'

const router=express.Router()



router.get('/allpost',verify,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/followingpost',verify,(req,res)=>{
    Post.find({postedBy:{ $in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost',verify,async(req,res)=>{
    const {title,body,pic} =req.body
    if(!title || !body || !pic){
        return res.status(422).json({error:"Please add all fields"})
    }
    req.user.password=undefined
    try{
        const post = await Post.create({
            title,
            body,
            photo:pic,
            postedBy:req.user
        })
        res.status(200).json(post);
    }catch(err){
        console.log(err)
    }
})

router.get('/mypost',verify,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json(mypost)
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put('/like',verify,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $addToSet:{likes:req.user._id}
    },{
        new:true
    })
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .exec((err,result)=>{
        if(err) return res.status(422).json({error:err})
        else return res.status(200).json(result)
    })
})

router.put('/unlike',verify,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .exec((err,result)=>{
        if(err) return res.status(422).json({error:err})
        else return res.status(200).json(result)
    })
})

router.put('/comment',verify,(req,res)=>{
    const comment={
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err) return res.status(422).json({error:err})
        else return res.status(200).json(result)
    })
})


router.delete('/deletepost/:postId',verify,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:"Unprocessable"})
        }
        if(post.postedBy._id.toString()===req.user._id.toString()){
            post.remove()
            .then((result)=>{
                res.status(200).json(result)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
})


export default router