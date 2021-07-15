const common = require('@leadercodes/modelsnpm');
const User = common.models.user;
const Event=common.models.event;
const Category = common.models.category;
const Contact = common.models.contact
const { createContact } = require('./eventRegistration');
const request = require("request");
const { keys } = require('../config/keys')

// const { sendToLeaderBox } = require('./calendar')



// firchange
sendToLeaderBox = async (message, subject, userName) => {
    console.log(message);
    let obj = {
      subject: subject,
      body: message,
      to: [userName],
      from: '@calendar',
      source: "Calendar",
      files: "null"
    }
  
    const options = {
      url: `${keys(req.get('host')).APi_URL_CONTACT}/createSystemWave`,
      method: "POST",
      json: obj
    };
    return new Promise((resolve, reject) => {
      request(options, (error, res, body) => {
        if (error) {
          console.log("error:" + error);
          reject(error);
        }
        else {
          console.log(`statusCode from sysyem wave: ${res.statusCode}`);
          resolve('sent');
        }
  
      });
    });
  
  
  
  }
const checkIfContactExists = async (req, res) => {
    try {
        console.log("hellllo");
        let currentUser = await User.findOne({ username: req.params.userName }).populate("contacts");
        console.log(currentUser);
        let findContact = currentUser.contacts.find(contact => contact.email === req.body.submition.email);
        console.log("findContact", findContact);
        if (findContact) {
            if( req.body.fromEventGallery === true){
                return findContact._id
            }
            res.status(200).json(findContact._id)
        }
        else {
            let contact = await createContact(req)
            if (contact) {
                let sendEventToLeaderBox = await sendToLeaderBox("new contact was created" + contact.name, currentUser.username);
            }
            if( req.body.fromEventGallery === true){
                return findContact._id
            }
            res.status(200).json(contact)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};

module.exports = {checkIfContactExists }
