const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
let validCollegeName = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/

//  /^[0-9]d{9}$/

const getIntern = async (req, res) => {
    try {
        let data = req.query.collegeName
        let collegeName = data.trim()
        if (!collegeName) {
            return res.status(400).send({status : false, msg : "give the input of collegeName"})
        }
        if (!validCollegeName.test(collegeName)) {
            return res.status(400).send({status : false, msg : "plz enter the college name in valid format"})
        }
        let findData = await collegeModel.findOne({name : collegeName, isDeleted : false})
        if (!findData) {
            return res.status(404).send({status : false, msg : "college not found"})
        }
        let internsData = await internModel.find({collegeId : findData._id, isDeleted : false}).select({name : 1, email : 1, mobile :1})
        if (!internsData) {
            return res.status(404).send({status : false, msg : "data not found"})
        }
        let addData = {
            name : findData.name,
            fullName : findData.fullName,
            logoLink : findData.logoLink,
            interns : internsData
        }
            return res.status(200).send({status : true, data : addData})
    } catch (err) {
        return res.status(500).send({status : false, msg : err.message})
    }
}


module.exports = {getIntern}