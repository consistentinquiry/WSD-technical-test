import ts_preset from 'ts-jest'
import puppeteer_preset from 'jest-puppeteer'


module.exports = Object.assign(
    ts_preset,
    puppeteer_preset
)
