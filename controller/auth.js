const common = require('@leadercodes/modelsnpm');
const User = common.models.user;
const request = require('request');
const {keys } = require('../config/keys')

const isPermission = async (req, res) => {

    if (req.headers['authorization'] !== 'view') {

        console.log('-------isPermission-------')
        let currentUser = await User.findOne({ username: req.params.userName })
        console.log("dsa", currentUser)
        if (!currentUser) {
            console.log("new user")
            let newUser = new User();
            const jwt = req.cookies[keys.JWT] ? req.cookies[keys.JWT] : req.headers['authorization'] ? req.headers['authorization'] : null
            const cookie = request.cookie(`jwt=${jwt}`)
            const options = {
                method: "GET",
                url: `${keys(req.get('host')).API_URL_ACCOUNT}/api/${req.params.userName}`,
                headers: { Cookie: cookie }
            };
            request(options, async (error, response, body) => {
                console.log("response.statusCode", response.statusCode)
                if (error || response.statusCode != 200) {
                    return res.status(401).send("not authorize")
                }
                else {
                    console.log("userName", req.params.userName)
                    newUser.username = req.params.userName;
                    newUser.email = JSON.parse(body).user.email
                    await newUser.save();
                    res.status(200).send();

                }

            });
        }
    }
    else {
        console.log("viewwwwwws")
        next()

    }

}
checkPermission = async (req, res, next) => {
    if (req.headers['authorization'] !== 'view') {
        console.log("checkPermission", req.query)
        const host = req.get('host');
        const isLocal = (req.query.isLocal == 'true');
        console.log("newIsLocal", isLocal);
        if (isLocal)
            return next();
        console.log("in checkPermission", req.originalUrl.split("/"));
        let userName = req.originalUrl.split("/")[1];
        let apiFlag = false
        let urlRoute
        let redirectUrl = host + "/admin";
        if (userName == "api") {
            userName = req.originalUrl.split("/")[2];
            apiFlag = true
            console.log("userNmae api",req.originalUrl)
        }
        console.log("userName", userName)
        if (!apiFlag) urlRoute = req.originalUrl.split("/")[3]

        if (!userName) {
            console.log("no uid");
            return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
        }
        else {
            const jwt = req.cookies[keys.JWT] ? req.cookies[keys.JWT] : req.headers['authorization'] ? req.headers['authorization'] : null
            const cookie = request.cookie(`jwt=${jwt}`)
            console.log(req.cookies && req.cookies.devJwt, cookie)
            console.log('000'+(req.get('host')))
            const options = {
                method: "GET",
                url: `${keys(req.get('host')).API_URL_ACCOUNT}/isPermission/${userName}`,
                headers: { Cookie: cookie }
            };

            request(options, (error, response, body) => {
                console.log("response.statusCode1", response.statusCode)
                console.log("body", typeof (body), body)
                if (error || response.statusCode != 200) {
                    return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
                }
                else {
                    console.log("userName", userName)
                    if (body == 'true') {
                        console.log("no error!!!!!!!");

                        return next();
                    }

                    return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
                }

            });

        }



    }
    else {
        console.log("I am")
        return next
    }
};
module.exports = { isPermission, checkPermission }
