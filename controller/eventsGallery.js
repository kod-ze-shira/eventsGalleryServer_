const common = require('@leadercodes/modelsnpm');
const User = common.models.user;
const Event = common.models.event
const Contact = common.models.contact
const Settings = common.models.eventsPageSettings
const axios = require('axios')
const puppeteer = require('puppeteer');
const open = require('open');


// const Settings = require('../modal/EventsPageSettings')
// const User = require('../modal/User');

const { sendEmail, createContact } = require('./eventRegistration');
const { checkIfContactExists } = require('./scheduler')

// //req contains a object of settings (including user_id) and updates if exists,otherwise- creates a new settings document 
const createOrUpadteEventsPageSettings = async (req, res) => {
  console.log("createOrUpadteEventsPageSettings")
  console.log('welcome ' + JSON.stringify(req.body))
  const user_id = await User.findOne({ username: req.params.userName })
  if (user_id) {
    let info = req.body
    info.user = user_id
    // const settings = await Settings.findOneAndUpdate({user:req.body.user},req.body,{new: true, upsert: true}) 
    const settings = await Settings.findOneAndUpdate({ user: user_id }, info, { new: true, upsert: true })
    await settings.save()
    if (settings) {
      try {
        console.log("settings saved")
        // const user = await User.findByIdAndUpdate(req.body.user,{eventsPageSettings: settings},{new: true} ) 
        const user = await User.findOneAndUpdate({ username: req.params.userName }, { eventsPageSettings: settings }, { new: true })
        await user.save()
        if (user) {
          res.status(200).json({ settings: settings })
          console.log("resSettings " + JSON.stringify(settings))
        }
      }
      catch (error) {
        console.log("error!! " + error)
        res.status(400).send('error in the controller' + error)
      }
    }
    else {
      console.log("error in settings")
      res.status(400).send('error in the controller' + error)
    }
  }

}

// //gets all the events gallerys' settings -if exists, otherwise returns null
const getEventsPageSettings = async (req, res) => {
  console.log("hi getEventsPageSettings")
  // const user_id = await 
  const user = await User.findOne({ username: req.params.userName })
  console.log("_id", user._id, " ", user.username)
  if (user) {
    try {
      const settings = await Settings.findOne({ user: user._id })
      if (settings)
        res.status(200).json({ "settings": settings })
      else
        res.status(200).send('no settings')
    }
    catch (error) {
      res.status(400).send('error in the controller' + error)
    }
  }
  else {
    console.log("error in settings")
    res.status(400).send('error in the controller' + error)
  }
}

// //contact Subscribe to get emails for every new event
const subscribeNewEventsNotification = async (req, res) => {
  //loginOrCreateContact 
  console.log("welcome to subscribeNewEventsNotification")
  req.body.submition = req.body;//
  req.body.fromEventGallery = true;
  let currentContactId = await checkIfContactExists(req, res);

  // if (currentContactId) {
  //     console.log(currentContactId)
  //     return currentContactId;
  // }
  // else {
  //     console.log("fell in catch")
  //     console.error(error)
  // }

  console.log("currentContactId: ", currentContactId)
  if (currentContactId) {
    // try {

    let currentUser = await User.findOneAndUpdate({ username: req.params.userName }, { $push: { contactsEventsNotification: currentContactId } }, { new: true })

    await currentUser.save()
    if (currentUser) {//
      console.log("currentUser: ", currentUser)
      const contact = await Contact.findByIdAndUpdate(currentContactId, { $push: { userEventsNotification: currentUser } }, { new: true })
      await contact.save()
      // res.status(200).json({ "user": currentUser }, { "contact": contact })
      res.status(200).json({ "user": currentUser, "contact": contact })
      console.log({ "user": currentUser }, { "contact": contact })
    }
    // }
    // catch (error) {
    //     res.status(400).send('error in the controller' + error)
    // }
    else {
      res.status(400).send('error in the controller :' + error)
    }
  }
  else {
    console.log("error in subscribeNewEventsNotification")
    res.status(400).send('error in the correntContactId' + error)
  }

}

const getCalendarEventsCategory = async (req, res) => {
  console.log("Welcome to getCalendarEventsCategory " + req.params.userName);

  let currentUser = await User.findOne({ "username": req.params.userName });
  console.log("currentUser", currentUser)
  if (!currentUser) return res.status(501).send("user Not Faund")
  Event.find({ user: currentUser._id, classNames: "event" }).populate("category")
    .then(events => {
      console.log("events @@@@@@@@@@@@@@@@@", events)
      res.send(events)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send("error", err)
    })
}
const getPageEventsGallery = async (req, res) => {
  console.log('hi eventsGalerry gili')
  console.log(`req.params.userName ${req.params.userName}`)
  console.log(`req.cookies.devJwt${req.cookies.devJwt}`)
  let devJwt = req.cookies.devJwt
  res.cookie('devJwt',devJwt, { domain: 'dev.leader.codes', httpOnly: true,maxAge: 900000})
// return res.status(200).send(`https://events.calendar.dev.leader.codes/${req.params.userName}`)
// window.open(`https://events.calendar.dev.leader.codes/${req.params.userName}`)
// open( `https://events.calendar.dev.leader.codes/${req.params.userName}`, function (err) {
//   if ( err ) throw err;    
// });
 return res.status(200).json({date:`https://events.calendar.dev.leader.codes/${req.params.userName}`})
}

const browser = await puppeteer.launch({ignoreDefaultArgs: ['--disable-extensions']});

//    const page = await browser.newPage();
//     await page.goto(`https://events.calendar.dev.leader.codes/${req.params.userName}`);
//     await browser.close();

// }

// // const notifyContactsAboutNewEvent = async (req, res) => {
// //   if (req.event.type === 'event') {
// //     currentUser = await User.findOne({ username: req.params.userName })
// //     if (currentUser.contactsEventsNotification.length > 0) {
// //       currentUser.contactsEventsNotification
// //       sendEmail()
// //     }
// //   }
// // }

// //gets _id of user (Malka)-to be erased
// const getMalka = async (req, res) => {

//   //const userName = req.params.userName
//   console.log("userName$#$#$#$#")
//   const user_id = await User.findOne({ username: req.params.userName })
//   console.log("malka_id", user_id._id)
//   if (user_id)
//     res.status(200).json({ res: user_id._id })

//   res.status(400).send('error in the controller' + error)

// }


// //Events gallery methods -end

module.exports = {
  getEventsPageSettings,
  createOrUpadteEventsPageSettings,
  subscribeNewEventsNotification,
  getCalendarEventsCategory,
  getPageEventsGallery
  // ,notifyContactsAboutNewEvent
}
//getMalka
