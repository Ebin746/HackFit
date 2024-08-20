// const mongoose=require("mongoose");
// const animalSchema=mongoose.Schema({
// lat:{type:Number,require:true},
// lng:{type:Number,require:true},
// animal:{type:String,require:true},
// users:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
// dislike:{type:Number},
// like:{type:Number}

// })

// module.exports=mongoose.model('animals',animalSchema)

const mongoose=require("mongoose");
const animalSchema=mongoose.Schema({
lat:{type:Number,require:true},
lng:{type:Number,require:true},
animal:{type:String,require:true},
description:{type:String},
users:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
userName:{type:String},
dislike:{type:Number},
like:{type:Number},
comments:{type:String}
})

module.exports=mongoose.model('animals',animalSchema)