

const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const validCollegeName = /^[A-Za-z ]+$/


const getIntern = async (req, res) => {
    try {
        let data = req.query.collegeName

        if (!data) {
            return res.status(400).send({status : false, msg : "give the input of collegeName"})
        }
        if (!validCollegeName.test(data)) {
            return res.status(400).send({status : false, msg : "plz enter the college name in valid format"})
        }
        let findData = await collegeModel.findOne({name : data, isDeleted : false})
        if (!findData) {
            return res.status(404).send({status : false, msg : "college not found"})
        }
        let internsData = await internModel.find({collegeId : findData._id, isDeleted : false}).select({name : 1, email : 1, mobile :1})
        if (!internsData) {
            return res.status(404).send({status : false, msg : "data not found"})
        }
        let finalData = {
            name : findData.name,
            fullName : findData.fullName, 
            logoLink : findData.logoLink,
            interns : internsData
        }
            return res.status(200).send({status : true, data : finalData})
    } catch (err) {
        return res.status(500).send({status : false, msg : err.message})
    }
}

module.exports = {getIntern}

