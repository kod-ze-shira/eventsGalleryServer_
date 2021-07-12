const dev = require('./dev')
const prod = require('./prod')
 
const keys = (host) => {
    console.log('gili keys')
  return host.includes('dev') ? 
   dev :
   prod
}
module.exports = { keys };