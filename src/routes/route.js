

const express = require("express");
const router = express.Router();
const collegeController = require("../Controllers/collegeController")
const getController = require("../controllers/getCollegeDetails")
const internController = require("../controllers/internController")

router.post("/functionup/colleges",collegeController.createCollege)
router.post("/functionup/interns",internController.createIntern)
router.get("/functionup/collegeDetails",getController.getIntern)

// router.all("/**", (req, res) => {
//     try{
//         res.status(400).send({status: false,msg: "The api you request is not available"})
//     }catch(err){
//         res.send(err.message)
//     }
// })


router.all("/*/", async function (req, res){

    res.status(404).send({status:false, msg: "page not found"})
})



module.exports=router;
