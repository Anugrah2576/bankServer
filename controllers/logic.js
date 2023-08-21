//import jsontokn
 const jwt= require("jsonwebtoken");
//import users
const users = require("../models/modelcollection")


//logic for register
const register=(req,res)=>{
    //access datas from body
    const acno = req.body.acno
    const uname = req.body.uname
    const psw = req.body.psw

    //check acno is present im users collection
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(401).send("user already exist")
        } else {
            //register user create a new object for user
            var newUser = new users({
                acno,
                uname,
                psw,
                balance:0,
                transactions:[]
            })
            // save the object in collection

            newUser.save()
            //response send //json()-convert js data into jason type and send
            res.status(200).json(newUser)
        }
    })
}


// logic for login
const login=(req,res)=>{
    const {acno,psw}=req.body
    users.findOne({acno,psw}).then(user=>{
        if(user){
            // generate token
            var token=jwt.sign({acno},'secretkey123')
            res.status(200).json({
                acno:user.acno,
                uname:user.uname,
                token
            })
        }
        else{
            res.status(401).json("incorrect password or acno")
        }
    })
}

//logic to get profile datas
const getProfile=(req,res)=>{
    //access acno param from url
    //const acno=req.params.acno
    const {acno} = req.params
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json({
                acno:user.acno,
                uname:user.uname
              
            })
        }
        else{
            res.status(401).json("user not exist")
        }
    })

}

const getBalance=(req,res)=>{
    const {acno}=req.params
    users.findOne({acno}).then(user=>{
        if(user)
        {
            res.status(200).json({
                acno:user.acno,
                uname:user.uname,
                balance:user.balance
            })
        }
        else
        {
            res.status(401).json("user not exist") 
        }
    })
}


const moneyTransfer=(req,res)=>{
    //access all datas from body
    const {fromAcno,toAcno,psw,amount,date}=req.body
    //convert amount to number(now amount is string)
    var amt=parseInt(amount)
   //check from user in database

   users.findOne({acno:fromAcno,psw}).then(fromUser=>{
    if(fromUser){
        users.findOne({acno:toAcno}).then(toUser=>{
            if(toUser)
            {
                if(amt<=fromUser.balance)
                {
                    fromUser.balance-=amt
                    fromUser.transactions.push({type:"DEBIT",amount:amt,date,user:toUser.acno,usn:toUser.uname})
                    fromUser.save()

                    toUser.balance+=amt
                    toUser.transactions.push({type:"CREDIT",amount:amt,date,user:fromUser.acno,usn:fromUser.uname})
                    toUser.save()
                        res.status(200).json({message:"Transaction Sucessfull"})
                    
                    
                }
                else{
                    res.status(401).json({message:"insufficient balance "})  
                }

            }else
            {
            res.status(401).json({message:"invalide credit credentials"})
            }
    })

    }else{
        res.status(401).json({message:"invalide debit credentials"})
    }
   })

}

//transaction history
const history=(req,res)=>{
    const {acno}=req.params
    users.findOne({acno}).then(user=>{
        if(user)
        {
            res.status(200).json(user.transactions) 
        }else
        {
            res.status(401).json("user not exist") 
        }
    })
}

// to delete account

const deleteAc=(req,res)=>{
    const {acno}=req.params
    users.deleteOne({acno}).then(user=>{
        if(user){
            res.status(200).json("Account Deleted Successfully")
        }
        else{
            res.status(401).json("user not exist")
        }
    })
}

module.exports = {
    register,login,getProfile,getBalance,moneyTransfer,history,deleteAc
}