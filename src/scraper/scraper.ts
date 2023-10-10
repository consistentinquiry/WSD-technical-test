import {HorseType} from "../types/HorseType";//TODO change to absolute path from src root

import puppeteer from 'puppeteer-extra';
import StealthPlugin  from 'puppeteer-extra-plugin-stealth'
import {Browser, Page} from "puppeteer";


//TODO unit test the lot!


export const scrape = async (eventUrl: string) => {
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({headless: true})
    try {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(2 * 60 * 1000);

        await page.goto(eventUrl)

        await page.waitForSelector('.sportsbook-selection-racing-basic')

        const horseElements = await page.$$(
            '.sportsbook-selection-racing-basic'
        );

        let horses: HorseType[] = [];

        for (const horseElement of horseElements) {

            const horseName: string = await horseElement.$eval(
                '.sportsbook-selection-racing-basic__runner-name',
                (element) => element.textContent.trim()
            );

            let odds: string = "Non-runner"

            //TODO handle if a horse doesnt have odds (non-runner)
            try {
                odds = await horseElement.$eval(
                    '.sportsbook-selection-racing-basic__price',
                    (element) => element.textContent.trim()
                )
            } catch (error) {
                //TODO probs not the best way of handling it
            }

            horses.push({name: horseName, odds: odds});
        }

        return horses;

    } catch (error) {
        console.log("An error occured during scraping: ", error);
    } finally {
        await browser.close()
    }
}
