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
// console.log('newURL' , newUrl)


return newUrl
}


function getUrlFromHtml(htmlString, baseUrl){
    const urls = []
    const dom = new JSDOM(htmlString) 
    const document = dom.window.document
    const links = document.querySelectorAll('a')
    for(const link of links){
        if(link.href.slice(0,1) === '/'){
            //relative URL
            try {
                const urlObj = new URL(`${baseUrl}${link.href}`)
                urls.push(urlObj.href)
            } catch (error) {
                console.log("Getting error from relative url",error.message)
            }
        }
        else{
            //Absolute URL
            try {
                const urlObj = new URL(link.href)
                urls.push(urlObj.href)
            } catch (error) {
                console.log("Getting an error in absolute url", error.message)
            }
        }
    }
    return urls
}


async function crawlPage(baseUrl, currentUrl, pages){
  const currUrlObj = new URL(currentUrl)
  const baseUrlObj = new URL(baseUrl)

  if(currUrlObj.hostname !== baseUrlObj.hostname){
      return pages;
    }

    const normalizedCurrUrl = normalizeURL(currentUrl)
    if(pages[normalizedCurrUrl] > 0){
      pages[normalizedCurrUrl]++;
      return pages; 
    }

    pages[normalizedCurrUrl] = 1;
    console.log(`Crawling this website currently at ${currentUrl}`)

    try {
      const response = await fetch(currentUrl);
        if(!response.ok){
            throw new Error("Getting Problem to fetch the website")
        }
        const contentType = response.headers.get('content-type');
        if(!contentType.startsWith('text/html'))
            {
                console.log('contentType', contentType)
                throw new Error('Content in the web page is not appropriate')
            }
        const htmlBody = await response.text()
        const nextUrls = getUrlFromHtml(htmlBody, baseUrl)
        
        for(const nextUrl of nextUrls){
          pages = await crawlPage(baseUrl, nextUrl, pages)
        }
    } catch (error) {
        console.log(error.message)
    }
    return pages;
}


module.exports = {
    normalizeURL,
    getUrlFromHtml,
    crawlPage
}