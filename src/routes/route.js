const express = require("express");
const router = express.Router();
const collegeController = require("../Controllers/collegeController")


router.post("/functionup/colleges",collegeController.createCollege)






router.all("/**", (req, res) =>  {
    try{
        res.status(404).send({status: false,msg: "The api you request is not available"})
    }catch(err){
        res.send(err.message)
    }
})





module.exports=router;
