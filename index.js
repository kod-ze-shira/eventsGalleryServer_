const mongoose = require("mongoose");
const common = require('@leadercodes/modelsnpm');
common.init(mongoose);
const express = require("express");
const httpProxy = require("http-proxy");
const proxy = httpProxy.createServer({});
const server = express();
const cookieParser = require("cookie-parser");
var cors = require("cors");

const dotenv = require("dotenv");
const path = require("path");
const request = require("request");
dotenv.config();
const port = 3034;
const calendarApiRouter = require("./routes/api.js");
const eventsViewsRouter = require("./routes/view.js");
const { url } = require("inspector");
const fileUpload = require("express-fileupload");
const queryString = require('query-string');

// const mongoose = require("mongoose");


server.use(cookieParser());

server.use(cors());


server.use(express.static(path.join(__dirname, "./build"))); // this is serve for react file

const bodyParser = require("body-parser");
server.use(
  express.urlencoded({
    
    // extended: true,
    // limit: '100mb',
    // parameterLimit:100000
  }),
  express.json({
    extended: true,
    // limit: '100mb'
  })
);
server.use(fileUpload({ createParentPath: true }));

// // server.use(bodyParser.urlencoded({ extended: true }));
server.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});
// mongoose.connect(process.env.DB_CONNECT, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });

// mongoose.connection.on("connected", () => {
//   console.log("connected!!!");
// });
server.use("/api", calendarApiRouter);
server.use("/", eventsViewsRouter);


server.get("/", (req, res, next) => {
  console.log("arrive to get3");
  // res.write('<h1>welcome to events gallery</h1>') 
  // res.end();
  // res.redirect("https://events.calendar.dev.leader.codes/");
})





server.listen(port, () => {
  console.log(`Server runnings att http://${port}/`);
});
// // server.use('/ifram/:userName/isPermission', authController.checkPermission, authController.isPermission)


// server.use('/:userName/isPermission', authController.checkPermission, authController.isPermission)




// // server.get('/', (req, res) => {
// //     console.log("icicicic")
// //   res.sendFile(path.join(__dirname, "./build/index.html"));
// // });





