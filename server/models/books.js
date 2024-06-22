const {Schema, model} = require("mongoose")


const bookSchema = new Schema({
    name :{
        type:String,
    },
    author :{
        type:String,
    },
    year :{
        type:Number,
    },
})

const bookModel = model("books",bookSchema)

module.exports = bookModel