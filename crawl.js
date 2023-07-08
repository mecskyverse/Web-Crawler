const url = require('node:url')


function normalizeURL(myUrl){
const urlObj = new url.parse(myUrl)
let newUrl = urlObj.hostname.concat(urlObj.path)

if(newUrl.charAt(newUrl.length -1) == '/')
{
    newUrl = newUrl.slice(0, -1)
}
console.log(newUrl)

return newUrl
}
normalizeURL("https://wagslane.dev/path/")
module.exports = {
    normalizeURL
}