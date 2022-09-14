const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")
const validEmail = /[a-zA-Z0-9_\-\.]+[@][a-z]+[\.][a-z]{2,3}/
const validMobile = 0


//without validation//
const createIntern = async (req, res) => {
    try {
        let data = req.body
        //let {name, email, mobile, collegeName} = data

        // if (Object.keys(data).length == 0) {
        //     return res.status(400).send({status : false, msg : "plz give input of intern data in request body"})
        // }
        // if (!name) {
        //     return res.status(400).send({status : false, msg : "name is required"})
        // }
        // if (regexname) {
        //     return res.status(400).send({status : false, msg : "valid name is required"})
        // }
        // if (!email) {
        //     return res.status(400).send({status : false, msg : "email is required"})
        // }
        // if (!validEmail.test(email)) {
        //     return res.status(400).send({status : false, msg : "plz enter ur emailId in valid format like this (example@xyz.xyz)"})
        // }
        // if (!mobile) {
        //     return res.status(400).send({status : false, msg : "mobile is required"})
        // }
        // if (regexmobile) {
        //     return res.status(400).send({status : false, msg : "valid mobile is required"})
        // }
        // if (!collegeName) {
        //     let findData = await collegeModel.findOne({name : collegeName})
        // }




        let saveData = await internModel.create(data)
        return res.status(200).send({status : true, msg : saveData})
    } catch (err) {
        return res.status(500).send({status : false, msg : err.message })
    }
}

module.exports = {createIntern}