const collegeModel = require("../models/collegeModel")
let validFullName = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
const validCollegeName = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
const validLogo = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i


const createCollege = async (req, res) => {
    try {
        let data = req.body
        let {name, fullName, logoLink, isDeleted} = data  
        let name1 = name.toLowerCase().trim()
        let fullName1 = fullName.trim()

    


        if (Object.keys(data).length == 0) {
            return res.status(400).send({status : false, msg : "plz give input of college"})
        }
        if (!name1) {
            return res.status(400).send({status : false, msg : "college Name is required"})
        }
        if (!validCollegeName.test(name1)) {
            return res.status(400).send({status : false, msg : "plz enter the college name in valid format"})
        }
        let findName = await collegeModel.findOne({name : name1,isDeleted : false})
        if (findName) {
            return res.status(400).send({status : false, msg : "collegeName already exist"})
        }
        if (!fullName1) {
            return res.status(400).send({status : false, msg : "college fullName is required"})
        }
        if (!validFullName.test(fullName1)) {
            return res.status(400).send({status : false, msg : "plz enter the college fullName in valid format"})
        }
        if (!logoLink) {
            return res.status(400).send({status : false, msg : "logoLink is required"})
        }
        if (!validLogo.test(logoLink)) {
            return res.status(400).send({status : false, msg : "logoLink should be an aws S3 url"})
        }
        if (isDeleted) {
            if (isDeleted != "false") {
                return res.status(400).send({status : false, msg : "the value of isDeleted should be always false at the time of creation"})
            }
        }
        let saveData = await collegeModel.create(data)
        return res.status(201).send({status : true, data : saveData})
    } catch (err) {
        return res.status(500).send({status : false, msg : err.message})
    }
}



module.exports = {createCollege}

