const {crawlPage} = require('./crawl')
const {printReport} = require('./report.js')
async function main() {
    const argument = process.argv.slice(2);
    if(argument.length === 1)
    console.log("WE have got the message")
    if(argument.length > 1)
    throw new Error("Argument URL is more than 1")
    if(argument.length < 1 )
    throw new Error("Argument URL is less than 1")
    const baseUrl = argument[0];
    const pages = await crawlPage(baseUrl, baseUrl, {})
    printReport(pages)
}
main()