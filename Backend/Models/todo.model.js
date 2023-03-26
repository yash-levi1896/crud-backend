const mongoose=require('mongoose');

const todoSchema=mongoose.Schema({
    title:String,
    detail:String,
    status:Boolean,
    userID:String
},{
    versionKey:false
})

const TodoModel=mongoose.model("todo",todoSchema);

module.exports={TodoModel}