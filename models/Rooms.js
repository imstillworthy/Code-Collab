const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema.Types

const roomSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        language:{
            type:String,
            default:"javascript",
            required:true
        },
        users:[
            {
                type:ObjectId,
                ref:"User"
            }
        ]
    }
)
mongoose.model("Room", roomSchema);