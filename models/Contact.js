
const mongoose = require('mongoose')
const { type } = require('os')

const contactSchema = mongoose.Schema({
    //isGoogleContact:{type:Boolean,default:false},


    name: { type: String },
    email: {
        type: String, required: true,
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    secondEmail: {
        type: String,
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    firstName: { type: String },
    lastName: { type: String },
    nickName: { type: String },
    address: { type: String },
    lat: { type: String },
    lng: { type: String },
    profile: { type: String },
    phone: {
        type: String,
        //  required: true,
        // match: /\d{10}/,
        // unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userEventsNotification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    starred: Boolean,
    thumbnail: String,
    numOfUnReadedWaves: Number,
    status: String,
    sourceUrl: String,
    leadOwner: String,
    leadSource: String,
    attached: String,
    customerType: String,
    companySize: String,
    companyName: String,
    companyAddress: String,
    gender: String,
    createDateAndTime: { type: Date, default: Date.now },
    bestTimeToCall: String,
    birthday: Date,
    telephon: String,
    mobileNumber: String,
    state: String,
    zipcode: String,
    website: String,
    whatsapp: String,
    linkedIn: String,
    facebook: String,
    instagram: String,
    youTube: String,
    active: Boolean,
    googleContact: { type: mongoose.Schema.Types.ObjectId, ref: 'ContactGoogle' },
    socialMediaOption: [{
        _id: false,
        icon: { type: String },
        url: { type: String }
    }],

    officePhone: { type: String },
    //bestTimeToCall: { type: String },
    companyDescribe: { type: String },
    subscribe: { type: String },
    active: { type: Boolean, default: true },
    conversations: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }
    ],
    quotes:
        [
            { type: mongoose.Schema.Types.ObjectId, ref: 'quotes' }
        ],
    source: [s = mongoose.Schema({
        id: { type: mongoose.Schema.Types.ObjectId },
        type: String
    })],
    leaderStatus: { type: String },
    leaderStatusContact: { type: String },

})

module.exports = mongoose.model('Contacts', contactSchema)