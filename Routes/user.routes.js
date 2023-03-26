const express=require('express');
const { UserModel } = require('../Models/user.model');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRoute=express.Router()

UserRoute.post("/register",async (req,res)=>{
    const {password,Name,email,location,age}=req.body
    try {
        //  const user1= await UserModel.find(req.body.email);
        //  if(user1.length!=0){
        //     res.status(400).send({"msg":"email already exsist"});
        //  }
         const user2= await UserModel.find(req.body);
         if(user2.length!=0){
            res.status(200).send({"msg":"user already registered please login!"})
         }else{
            bcrypt.hash(password,8, async (err,hash)=>{
                if(err){
                    console.log(err)
                    res.send({"msg":"something went wrong"})
                }
                try {
                    const user=  new UserModel({password:hash,Name,email,location,age});
                    await user.save();
                    res.status(200).send({"msg":"user register successfully"})
                } catch (err) {
                    res.status(200).send({"msg":"email already exsist"});
                }
                
            })
           
         }
        
    } catch (error) {
        res.status(400).send({"msg":"Not able to register user.email alrady existed use other email"})
    }
})

UserRoute.post("/login",async (req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.find({email});
        if(user.length!=0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(err){
                    console.log(err)
                }
                if(result){
                 let token=jwt.sign({'userID':user[0]._id},'gupta');
                 res.send({"msg":"Login Successfull","token":token,"Name":user[0].Name});
                }else{
                    res.status(400).send({"msg":"Wrong password !"})
                }
                
            })
        }else{
            res.status(400).send({"msg":"Wrong email !"})
        }
        // user.length!==0 ?   res.status(200).send({msg:"Login successful","token":jwt.sign({ userID: 'yash' }, 'gupta')}) : res.status(400).sen({msg:"login failed"})
    } catch (error) {
        res.status(400).send({"msg":"something went wrong"});
        console.log(error)
    }
})











module.exports={UserRoute}