const common = require('@leadercodes/modelsnpm');
const User = common.models.user;
const Event = common.models.event;
const Category =common.models.category;
const Contact = common.models.contact;
const { keys } = require('../config/keys')

// h

// const User = require('../modal/User.js');




const request = require("request");
const Promise = require("promise");

checkRegistrantsNumber = async (req, res) => {
  console.log("//////////////////////////");
  let currentUser = await User.findOne({ username: req.params.userName }).populate("contacts");
  try {
    
    // let currentEvent = await Event.findOne({ "_id": req.params.eventId });
    let currentEvent = await Event.findOne({ "_id": req.params.eventId });
    console.log("try//////////////////////////");
    if (currentEvent.maxParticipants === 0 || currentEvent.maxParticipants > currentEvent.registrants.length) {
      console.log("if//////////////////////////");
      res.status(200).send({ massage: "valid" });
    }
    else {
      console.log("else//////////////////////////");
      res.status(200).send({ massage: "not valid" });

    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};
sumRegister = async (req, res) => {
  let currentUser = await User.findOne({ username: req.params.userName }).populate("contacts");
  let currentEvent = await Event.findOne({ "_id": req.params.eventId });
  console.log("i am hear in sum register")
  console.log("jdsflkdsmflkds")
  console.log("req submi from sum", req.submition)
  console.log("curent event", currentEvent.title)
  console.log("user details", req.body.submition)
  // currentEvent.registrants.length
  let emailBody = null;
  emailBody = `<div className='demo-app-sidebar-section'>
    <h2> ${currentEvent.title}</h2>
<b>new register registereed to your event</b>      
  </div>`
  if (req.body.submition.name !== "")
    emailBody +=
      `<div>
<b>Name: </b>
<lable>${req.body.submition.name} <lable>     
</div>`
  if (req.body.submition.email !== "")
    emailBody +=
      `<div>
<b>Email: </b>
<lable>${req.body.submition.email} <lable>     
</div>`
  if (req.body.submition.phone !== "")
    emailBody += `<div>
<b>Phone: </b>
<lable>${req.body.submition.phone} <lable>     
</div>`
  let sendEventToLeaderBox = await sendToLeaderBox(emailBody, "new register", currentUser.username);
}


addContact = async (req, res) => {
  console.log("------------------------------------------");
  console.log("req submi", req.submition)
  sumRegister(req, res)
  let currentUser = await User.findOne({ username: req.params.userName }).populate("contacts");
  console.log("curet user from envitation", currentUser)
  let currentContact = currentUser.contacts.find(contact => contact.email === req.body.submition.email)
  let currentEvent = await Event.findOne({ id: req.params.eventId }).populate("contacts");;
  try {
    let success;
    let findContact = currentUser.contacts.some(contact => contact.email === req.body.submition.email);
    if (findContact) {
      let findRegister = currentEvent.registrants.some(id => id.toString() === currentContact._id.toString());
      console.log("findRegister" + findRegister);
      if (findRegister) {
        console.log("rrrrrrrrrrrrrrrrrrr " + req.body.eventDetailsEmail);
        res.status(200).send({ massage: 0 });
      }
      else {
        try {
          currentEvent.registrants.push(currentContact._id);
          const updateEvent = await currentEvent.save();
          console.log("555555555555555555" + currentContact.email)
          let sendEventDetailsEmailResult = await sendEmail(
            req.body.eventDetailsEmail,
            currentContact.email,
            "Your registration for the event was successful"
          );
          // sumRegister(req, res)
          res.status(200).send({ massage: 1 });
        }
        catch (error) {
          console.log(error);
          res.status(500).send({ massage: error });
        }
      }
    }
    else {
      await createContact(req)
      let userEmail = currentUser.email;
      let sendEmailResult = await sendEmail(
        req.body.submition.email,
        currentUser.username,
        req.body.eventDetailsEmail,
        "Event registration "
      );

      try {
        currentContact = await Contact.findOne({ email: req.body.submition.email });
        console.log("-----" + currentContact.email);
        currentEvent.registrants.push(currentContact._id);
        const updateEvent = await currentEvent.save();
        let sendEventDetailsEmailResult = await sendEmail(
          req.body.submition.email,
          currentUser.username,
          req.body.eventDetailsEmail,
          "Your registration for the event was successful"
        );
        // sumRegister(req, res)
        res.status(200).send({ massage: 2 });
      }
      catch (error) {
        console.log(error);
        res.status(500).send({ error: error });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};
const createContact = (req) => {
  return new Promise((res, rej) => {
    var userName = req.params.userName;
    var body = {}
    body =
    {
      "contact": {
        "email": req.body.submition.email,
        "phone": req.body.submition.phone,
        "name": req.body.submition.name
      },
      "withConversation": false,
      "source": {
        "type": "Events"
      }
    }
    console.log(userName);
    const options = {
      url: `${keys(req.get('host')).APi_URL_CONTACT}/${userName}/createContact`,
      method: 'POST',
      headers: { Authorization: "view" },
      json: body,
    }
    request(options, (error, response, body) => {
      console.log("createContact");
      if (error) {
        console.log("error", error);
        rej(error);
      }
      else {
        console.log("body", body);
        console.log("contact", response.result);
        res(body.newContact._id)
      }
    });
  })
}

// submitToLeaderBox = async (req) => {
//   console.log("Authorization", req.headers["authorization"]);
//   const { body, userEmail, subject, submition } = req.body;
//   let currentUser = await User.findOne({ username: req.params.userName });
//   console.log("1111111111111" + currentUser);
//   let contactDetails = submition;
//   let conversation = { source: "Time", subject: "Event registration " };
//   let wave = { body: req.body.body };
//   let data = {
//     conversation,
//     wave,
//     contact: { email: contactDetails.email, name: contactDetails.name, phone: contactDetails.phone },
//   }
//   console.log("data", data);
//   console.log("currentUser.uId", currentUser.uid);
//   const options = {
//     url: `https://box.leader.codes/api/${currentUser.uid}/conversation/getConversation`,
//     headers: { Authorization: req.headers["authorization"] },
//     method: "POST",
//     json: data,
//   };
//   return new Promise((resolve, reject) => {
//     request(options, (error, res, body) => {
//       if (error || res.statusCode != 200) {
//         console.log("error:" + error);
//         reject(error);
//       }
//       console.log(`statusCode: ${res.statusCode}`);
//       resolve(body);
//     });
//   });
// };
sendEmail = async (to, from, subject, html) => {
  console.log("arrive to sendEmail");
  const emailToSend = {
    from: from,
    to: to,
    subject: subject,
    html: html
  }

  const options = {
    url: `${keys(req.get('host')).API_URL_MAIL}`,
    method: 'POST',
    headers: { Authorization: "secretKEY@2021" },
    json: emailToSend,
  };
  return new Promise((resolve, reject) => {
    request(options, (error, res, body) => {
      if (error) {
        console.error("my error:" + error);
        reject(error);
      }
      console.log(`my statusCode: ${res.statusCode}`);
      resolve('sent')
    });
  });
}


// sendEmail = async (body, toEmail, subject) => {
//   console.log("!!!!!!!!!!!!!!!!!!!!sendEmail!!!!!!!!!!!!!"+ toEmail);
//   var email = {};
//   email = {
//     to: toEmail,
//     from: "noreply@leader.codes",
//     subject: subject,
//     html: body,
//   };
//   const options = {
//     url: "https://api.leader.codes/mail/sendEmail",
//     method: "POST",
//     headers: { Authorization: "view" },
//     json: email,
//   };
//   return new Promise((resolve, reject) => {
//     request(options, (error, res, body) => {
//       if (error) {
//         console.error(error);
//         reject(error);
//       }
//       console.log(`statusCode: ${res.statusCode}`);
//       console.log(body);
//       resolve(body);
//     });
//   });
// };

// urlEventImg = async (req) => {
//   let currentUser = await User.findOne({ username: req.params.userName }).populate("contacts");
//   console.log("qqqqqqqqqqq  "+ currentUser)
//   const options = {
//     url: 'https://files.leader.codes/api/'+ currentUser._id +'/upload',
//     method: "POST",
//     headers: { Authorization: "view" },
//     json: req.body,
//   };
//   return new Promise((resolve, reject) => {
//     request(options, (error, res, body) => {
//       if (error) {
//         console.error(error);
//         reject(error);
//       }
//       console.log(`statusCode: ${res.statusCode}`);
//       console.log(body);
//       resolve(body);
//     });
//   });


// uploadedFile = async (fileToUpload, uId, headers) => {
//   console.log("headers", headers);
//   return new Promise(async (resolve, reject) => {
//     console.log(fileToUpload);
//     console.log("uploadedFile");
//     const uri = `https://files.codes/api/${uId}/upload`;
//     console.log(uri);
//     const options = {
//       method: "POST",
//       url: uri,


//       headers: {
//         Authorization: headers,
//         "Content-Type": "multipart/form-data",
//       },
//       formData: {
//         file: {
//           value: fileToUpload.data,
//           options: {
//             filename: fileToUpload.name,
//           },
//         },
//       },
//     };

//     request(options, async (err, res, body) => {
//       if (err) {
//         console.log(err);
//         reject(err);
//       }
//       console.log("result from server", body);
//       try {
//         let url = JSON.parse(body).data.url;
//         resolve(url);
//       } catch (error) {
//         reject(error);
//       }
//     });
//   });
// };

// getUrlEventImg = async (req, res) => {
//   // urlEventImg(req).then((result)=>{
//   console.log("qqqqqqqqqqq  " + req.params,)
//   //   res.send(result)
//   // })
//   let currentUser = await User.findOne({ username: req.params.userName }).populate("contacts");
//   console.log("qqqqqqqqqqq  " + currentUser)

//   console.log("qqqqqqqqqqq  " + req.files.image)
//   let url = await uploadedFile(req.files.image, currentUser.username, req.headers["authorization"]);
//   console.log("!!!!!!!!!!!!!!!!!  " + url)
//   // res.send(url)
//   res.status(200).json({
//     url
//   })
// }


module.exports = {
  checkRegistrantsNumber,
  addContact,
  // getUrlEventImg,
  sendEmail,
  createContact
}