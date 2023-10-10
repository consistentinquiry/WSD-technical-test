const ts_preset =require('ts-jest')
const puppeteer_preset = require('jest-puppeteer')


module.exports = Object.assign(
    ts_preset,
    puppeteer_preset
)
