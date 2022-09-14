const collegeModel = require("../models/collegeModel")


//without validation//
const createCollege = async (req, res) => {
    try {
        let data = req.body
        let {name, fullName, logoLink} = data 

        if (Object.keys(data).length == 0) {
            return res.status(400).send({status : false, msg : "plz give input of college"})
        }
        if (!name) {
            return res.status(400).send({status : false, msg : "name is required"})
        }
        if (!fullName) {
            return res.status(400).send({status : false, msg : "fullName is required"})
        }

        if (!logoLink) {
            return res.status(400).send({status : false, msg : "logoLink is required"})
        }

        let saveData = await collegeModel.create(data)
        return res.status(200).send({status : true, data : saveData})
    } catch (err) {
        return res.status(500).send({status : false, msg : err.message})
    }
}



module.exports = {createCollege}