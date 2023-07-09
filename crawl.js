// const URL = require('node:url')
const jsdom = require('jsdom')
const {JSDOM} = jsdom


function normalizeURL(myUrl){
const urlObj = new URL(myUrl)

let newUrl = urlObj.hostname.concat(urlObj.pathname)

if(newUrl.length > 0 &&  newUrl.charAt(newUrl.length -1) === '/')
{
    newUrl = newUrl.slice(0, -1)
}
console.log('newURL' , newUrl)


return newUrl
}


function getUrlFromHtml(htmlString){
    try {
    const dom = new JSDOM(htmlString) 
    const document = dom.window.document
    const links = document.querySelectorAll('a')
    const urls = Array.from(links).map(link => link.href)
    const normalizeURLArray = urls.map(url => {}) 
    return normalizeURLArray
    } catch (error) {
        console.log(error.message)
    }
    // console.log(urls)
    // console.log(normalizeURLArray)
}

htmlString = `<html>
<body>
    <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    <a href="https://blog.booty.dev"><span>New one</span></a>
    <a href="https://blog.booti.dev"><span>Go to Boot.dev</span></a>
</body>
<a href="https://blog.booty.dev"><span>Go to Boot.dev</span></a>

</html>
`
getUrlFromHtml(htmlString)
normalizeURL('https://boot.Dev/path/')
module.exports = {
    normalizeURL,
    getUrlFromHtml
}