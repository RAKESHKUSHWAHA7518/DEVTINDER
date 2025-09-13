const mongoose=require('mongoose');
const connectionRequestSchema=new mongoose.Schema({
    fromUserId:
    {
        type:mongoose.Schema.Types.ObjectId,required:true
    }
    ,
    toUserId:{type:mongoose.Schema.Types.ObjectId,required:true},
    status:{
        type:String, 
        enum:{
           values: [  'ignore','interested','accepted','rejected'],
           message:'{VALUE} is not supported'
        },
        default:'pending'

    }}
,{timestamps:true}
);

connectionRequestSchema.index({fromUserId:1,toUserId:1},{unique:true});

 connectionRequestSchema.pre('save',async function(next){

    const connectionRequest= this;
    if(connectionRequest.toUserId===connectionRequest.fromUserId){
        return next(new Error('You cannot send a connection request to yourself'));
    }
    next();
})
const ConnectionRequestModel= new mongoose.model('ConnectionRequest',connectionRequestSchema);
module.exports=ConnectionRequestModel;
