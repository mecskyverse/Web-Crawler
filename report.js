function printReport(pages){
    const sortedPages = sortPages(pages);
    for(const page of sortedPages){
        console.log(`Found ${page[1]} internal links to ${page[0]}`)
    }
}

function sortPages(pages){
    const entries = Object.entries(pages);
    entries.sort((a,b) => b[1] - a[1])
    return entries
}

module.exports = {
    printReport
}