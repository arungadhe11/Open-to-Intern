const express = require("express");
const router = express.Router();
const collegeController = require("../Controllers/collegeController")
const fetchController = require("../controllers/getCollegeDetails")
const internController = require("../controllers/internController")

router.post("/functionup/colleges",collegeController.createCollege)
router.post("/functionup/colleges",internController.createIntern)

router.get("/functionup/collegeDetails",fetchController.getIntern)





router.all("/**", (req, res) =>  {
    try{
        res.status(404).send({status: false,msg: "The api you request is not available"})
    }catch(err){
        res.send(err.message)
    }
})





module.exports=router;
