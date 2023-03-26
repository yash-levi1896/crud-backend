const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    Name:String,
    email:{type:String,unique:true},
    password:String,
    age:Number,
    location:String
},{
    versionKey:false
})

const UserModel=mongoose.model("user",userSchema);

module.exports={UserModel}