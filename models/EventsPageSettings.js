const mongoose = require('mongoose')
const EventsPageSettingsSchema = mongoose.Schema({

   
    eventsPageColor: {
        type: String,
        default: ""
    },
    eventsButtonColor: {
        type: String,
        default: ""
    },
    amountEventsInRow: {
        type: Number,
        default: 3
    },
    ShowHistoricalEvents: {
        type: Boolean,
        default: true
    },
    watchPreviousEvents: {
        type: Boolean,
        default: true
    },
    PreviousEvents: {
        type: Array,
        default: []
    },
    eventsPageAlignment: {
        type: String,
        default: 'left'
    },
    eventsPageImageOrVideo: {
        type: String,
        default: ""
    },
    eventsPageLogo: {
        type: String,
        default: ""
    },
    eventsPageTitle: {
        type: String,
        default: ""
    },
    eventsPageDescription: {
        type: String,
        default: ""
    },
    displayHeader: {
        type: Boolean,
        default: true
    },
    facebook: {
        type: Boolean,
        default: true
    },
    facebookLink: {
        type: String,
        default: ""
    },
    twitter: {
        type: Boolean,
        default: true
    },
    twitterLink: {
        type: String,
        default: ""
    },
    instagram: {
        type: Boolean,
        default: true
    },
   
    youtube: {
        type: Boolean,
        default: true
    },
    youtubeLink: {
        type: String,
        default: ""
    },
    name: {
        type: Boolean,
        default: false
    },
    email: {
        type: Boolean,
        default: false
    },
    phone: {
        type: Boolean,
        default: false
    },
    address: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})


module.exports = mongoose.model('EventsPageSettings', EventsPageSettingsSchema)