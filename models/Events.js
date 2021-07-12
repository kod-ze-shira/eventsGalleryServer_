const mongoose = require('mongoose')
const eventSchema = mongoose.Schema({
    title: {
        type: String
    },
    start: {
        type: Date,
        require: true,
        //match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
    },
    end: {
        type: Date,
    },
    rrule: {
        type: Object,
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    place: {
        type: String,
        // match: /\d{3}-\d{3}-\d{4}/,
        // unique: true,
    },

    notifications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notification'
        }
    ],

    createdDate: {
        type: Date
    },

    participants:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Contacts'
            }
        ],

    maxParticipants: {
        type: Number,
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
        //type: String,
    },
    classNames: {
        type: String,
    },
    description: {
        type: String,
    },
    registrants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    }],
    responsibles: [
        {
            type: String,
        }
    ],
    goals: {
        type: String,
    },
    aims: {
        type: String,
    },
    contactId: {
        type: String,
        // type:mongoose.Schema.Types.ObjectId,
        // ref:'Contact'
    },
    taskId: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
    },
    registrationURL: {
        type: String
    }
    ,
    allDay: { type: Boolean },
    confirmParticipation:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contacts'
    }],

    done: {
        type: Boolean, defaFult: false
    }

})
module.exports = mongoose.model('Event', eventSchema)