import {Request, Response} from "express";
import {scrape} from "../../scraper/scraper";

exports.odds = async (req: Request, res:Response) => {
    //@ts-ignore
    if (!req.user) {
        res.status(403)
            .send({
                message: "Invalid JWT token"
            });
    }
    //@ts-ignore
    if (req.user.userType == "premium") {
        const {eventUrl} = req.body;

        if (!eventUrl) {
            return res.status(400).send('URL is required.');
        }

        console.log('Received URL:', eventUrl);

        const horses = await scrape(eventUrl).then(value => {
            return value
        }).catch((errors) => {
            console.error("Promise error: ", errors)
        })

        if (horses !== null) {
            console.log("The promised bets: ", horses);
        }

        res.send(horses);
    } else {
        res.status(403)
            .send({
                message: "Unauthorised access"
            });
    }
}