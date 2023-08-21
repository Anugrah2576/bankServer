//db server integration
//import mongoose
const mongoose=require('mongoose')

//connect with mongodb atlas
mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("-----mongodb Atlas connected-----");
}).catch(()=>{
    console.log("-----mongodb Error-----");
})