const {test, expect} = require('@jest/globals')
const { normalizeURL, getUrlFromHtml } = require('./crawl')

const url = "http://wagslane.Dev/path"
const url1 = "https://wagslane.dev/path"
const url2 = "https://wagslane.Dev/path/"
const url3 = "https://wagslane.dev/path"
const correctUrl = "wagslane.dev/path"

test('Check for Http is there in the url',() =>{
    expect(normalizeURL(url)).toBe(correctUrl)
})

test('LowerCase Check',() =>{
    expect(normalizeURL(url1)).toBe(correctUrl)
})
test('/ After path',() =>{
    expect(normalizeURL(url2)).toBe(correctUrl)
})
test('effect of https on the check',() =>{
    expect(normalizeURL(url3)).toBe(correctUrl)
})



test('Check for getUrlFromHtml function', () => {
    const input = `<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="https://blog.booty.dev"><span>New one</span></a>
        <a href="https://blog.booti.dev"><span>Go to Boot.dev</span></a>
    </body>
    <a href="https://blog.booty.dev"><span>Go to Boot.dev</span></a>
    
    </html>
    `
    const actual = getUrlFromHtml(input)
    const expected = ["blog.boot.dev", "blog.booty.dev", "blog.booti.dev", "blog.booty.dev",]
    expect(actual).toStrictEqual(expected)
})