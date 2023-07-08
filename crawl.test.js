const {test, expect} = require('@jest/globals')
const { normalizeURL } = require('./crawl')

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