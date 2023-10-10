import { scrape } from '../../main/scraper/scraper';
import puppeteer from "puppeteer-extra";


// Mock puppeteer and puppeteer-extra
jest.mock('puppeteer-extra', () => {
    return {
        use: jest.fn(),
        launch: jest.fn(),
    };
});

// Mock puppeteer-extra-plugin-stealth
jest.mock('puppeteer-extra-plugin-stealth', () => ({
    __esModule: true,
    default: jest.fn(),
}));

beforeEach(() => {
    // Reset mock functions before each test
    jest.clearAllMocks();

    // Mock puppeteer launch function
    (puppeteer.launch as jest.Mock).mockResolvedValue({
        newPage: jest.fn().mockResolvedValue({
            goto: jest.fn().mockResolvedValue({
                content: jest.fn().mockResolvedValue(`
                    <html>
                        <body>
                            <div class=".sportsbook-selection-racing-basic">
                                <div class=".sportsbook-selection-racing-basic__runner-name">My Horse</div>
                                <div class=".sportsbook-selection-racing-basic__price">10/1</div>
                            </div>
                        </body>
                    </html>
                `),
            }),
        }),
        close: jest.fn(),
    });
});

describe('scrape', () => {
    it('should scrape the event page and return an array of HorseType objects', async () => {
        const eventUrl = 'https://example.com/event';
        const horses = await scrape(eventUrl);
        expect(horses).toBeDefined();
        expect(horses![0]).toEqual({ name: 'My Horse', odds: '10/1' });
    });

    it('should throw an error if the event page cannot be scraped', async () => {
        const eventUrl = 'https://example.com/non-existent-event';
        await expect(scrape(eventUrl)).rejects.toThrow();
    });
});
