const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")
const validEmail = /[a-zA-Z0-9_\-\.]+[@][a-z]+[\.][a-z]{2,3}/
const validMobile = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/
const validName = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/

//without validation//
const createIntern = async (req, res) => {
    try {
        let data = req.body
        let { name, email, mobile, collegeName, isDeleted} = data
        //let trimmedName = name

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "plz give input of intern " })
        }
        if (!name) {
            return res.status(400).send({ status: false, msg: "name is required" })
        }
        if (!validName.test(name)) {
            return res.status(400).send({ status: false, msg: "valid name is required" })
        }
        if (!email) {
            return res.status(400).send({ status: false, msg: "email is required" })
        }
        if (!validEmail.test(email)) {
            return res.status(400).send({ status: false, msg: "plz enter ur emailId in valid format like this (example@xyz.xyz)" })
        }
        let findEmail = await internModel.findOne({ email: email ,isDeleted : false})
        if (findEmail) {
            return res.status(400).send({ status: false, msg: "email id already exsits" })
        }
        if (!mobile) {
            return res.status(400).send({ status: false, msg: "mobile is required" })
        }
        if (!validMobile.test(mobile)) {
            return res.status(400).send({ status: false, msg: "valid mobileNo. is required" })
        }
        let findmobileNo = await internModel.findOne({ mobile: mobile , isDeleted : false})
        if (findmobileNo) {
            return res.status(400).send({ status: false, msg: "Mobile no. already exsits" })
        }
        if (!collegeName) {
            return res.status(400).send({ status: false, msg: "College name is required" })
        }
        let findData = await collegeModel.findOne({ name: collegeName,isDeleted:false })
        if (!findData) {
            return res.status(404).send({ status: false, msg: " College not found" })
        }
        if (isDeleted) {
            if (isDeleted != "false") {
                return res.status(400).send({status : false, msg : "the value of isDeleted should be always false at the time of creation"})
            }
        }
        data['college'] = findData.id

        let saveData = await internModel.create(data)
        let finalData = {
            isDeleted: saveData.isDeleted,
            name: saveData.name,
            email: saveData.email,
            mobile: saveData.mobile,
            collegeId: saveData._id
        }
        return res.status(201).send({ status: true, msg: finalData })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
module.exports = { createIntern }
