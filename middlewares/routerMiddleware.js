//middleware
//a function with 3 arguments

const jwtMiddleware=(req,res,next)=>{

try{
//access token from request header
    const token=req.headers["access_token"]
   //validate token jwt verify

   jwt.verify(token,"secretkey123")

   //if token is verified continue the request
   next()

}
catch{

    res.status(404).json("please login")

}

}

module.exports=jwtMiddleware



