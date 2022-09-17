

const express = require("express")
const bodyParser = require("body-parser")
const route = require("./routes/route")
const mongoose = require("mongoose")
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

mongoose.connect("mongodb+srv://Deepanshuyadav:DEEPyadav1446@cluster0.f9r26yw.mongodb.net/group09Database", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected")) // promise
.catch( err => console.log(err))  //error handling
     
app.use('/', route)
 
app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});