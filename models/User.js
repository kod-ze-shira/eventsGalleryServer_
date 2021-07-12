const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email: { type: String, require: true, unique: true, match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
    uid: { type: String, require: true },
    username: {type: String},
    premium: { type: Boolean },
    contacts: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Contacts' }
    ],
    contactsEventsNotification :[
        { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }
    ],
    videos: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Video' }
    ],
    tags: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }
    ],
    landingPages: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'LandingPage' }
    ],
    forms: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Form' }
    ],
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    desktopFcmToken: {
        type:String
    },
    androidFcmToken: {
        type:String
    },
    calendarSettings: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CalendarSettings'
    },
    eventsPageSettings: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventsPageSettings'
    },
     googleTokens: [{
    name:{ type: String},
    googleToken: { type: String },
    enable: { type: Boolean, default: true }
}]
})

module.exports = mongoose.model('User', userSchema)