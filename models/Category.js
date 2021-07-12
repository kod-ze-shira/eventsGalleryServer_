const mongoose = require('mongoose')
const categorySchema = mongoose.Schema({
    
    categoryName: { 
        type: String
        //match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
    },
    categoryColor: { 
        type: String
    },
    events:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Event'
        }
    ]
})

module.exports = mongoose.model('Category', categorySchema)