const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")
const validEmail = /[a-zA-Z0-9_\-\.]+[@][a-z]+[\.][a-z]{2,3}/
const validMobile = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/
const validName =  /^[A-Za-z ]+$/  


const createIntern = async (req, res) => {
    try {
        let data = req.body
        let { name, email, mobile, collegeName} = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "plz give input of intern in request body" })
        }
        if (!name) {
            return res.status(400).send({ status: false, msg: "name is required" })
        }
        if (!validName.test(name)) {
            return res.status(400).send({ status: false, msg: "plz enter ur name in valid format" })
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
            return res.status(400).send({ status: false, msg: "enter valid mobile number" })
        }
        let findmobileNo = await internModel.findOne({ mobile: mobile , isDeleted : false})
        if (findmobileNo) {
            return res.status(400).send({ status: false, msg: "mobile number already exsits" })
        }
        if (!collegeName) {
            return res.status(400).send({ status: false, msg: "College name is required for finding that college where u can apply for ur internship" })
        }
        let findData = await collegeModel.findOne({ name: collegeName,isDeleted:false })
        if (!findData) {
            return res.status(404).send({ status: false, msg: " College doesn't exists" })
        }
        data['collegeId'] = findData._id

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
