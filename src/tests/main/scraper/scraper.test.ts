import {scrape} from "../../../main/scraper/scraper";
describe("scraper", () => {
    it('should extract betting odds from page', async () => {
        const result = await scrape("file://"+__dirname+"/../../resources/page.html")
        const expectedResult = [
            {
                "name": "Majestic Creed",
                "odds": "3/1"
            },
            {
                "name": "Pistol Liz Ablazen",
                "odds": "7/2"
            },
            {
                "name": "One More Kelly",
                "odds": "4/1"
            },
            {
                "name": "Princess Sophie",
                "odds": "9/2"
            },
            {
                "name": "Warrior's Ransom",
                "odds": "5/1"
            },
            {
                "name": "Knickersinatwist",
                "odds": "6/1"
            },
            {
                "name": "Ninetypercentbrynn",
                "odds": "10/1"
            },
            {
                "name": "Out Dancing",
                "odds": "18/1"
            },
            {
                "name": "Beach Daze",
                "odds": "Non-runner"
            }
        ];

        expect(result).toEqual(expectedResult);
    })
});