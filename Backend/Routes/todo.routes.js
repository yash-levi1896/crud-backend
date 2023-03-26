const express=require('express');
const jwt=require('jsonwebtoken')
const {TodoModel}=require('../Models/todo.model')
const todoRoute=express.Router();



todoRoute.post("/add",async(req,res)=>{
    const todo=new TodoModel(req.body);
    try {
        await todo.save();
         res.status(200).send({msg:"todo created !"})
    } catch (error) {
        res.status(400).send({msg:"todo can't be created!"});
        console.log(error)
    }
    
    
})

todoRoute.get("/", async(req,res)=>{
    const token=req.headers.authorization
    //console.log("token",token)
    if(token){
        const decoded=jwt.verify(token,'gupta');
    
   // console.log(decoded)
    if(decoded.userID){
        try {
            const user= await TodoModel.find({userID:decoded.userID});
            res.status(200).send(user)
        } catch (error) {
            res.status(400).send({"msg":"Please login!"})
        } 
    }
}else{
    res.status(400).send({"msg":"Please login!"})
}
})

todoRoute.delete("/delete/:todoID", async(req,res)=>{
    try {
        await TodoModel.findByIdAndDelete({_id:req.params.todoID});
        res.status(200).send({"msg":"todo deleted"});
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
    
})

todoRoute.patch("/update/:todoID", async (req,res)=>{
    const payload=req.body;
    const todoID=req.params.todoID;
    try {
        await TodoModel.findByIdAndUpdate({_id:todoID},payload);
        res.status(200).send({"msg":"todo updated"})
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})


module.exports={todoRoute}
