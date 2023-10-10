/**
 * Parse and return the URL provided as args. Validation is done to ensure it is in fact a URL.
 *
 * @param {Array} a string array of arguments to parse.
 * @returns {string} the validated URL of site.*/
const parseUrlFromArgs = (args: string []): string => {
    if (args.length == 2) {
        console.error("You must provide a site argument to scrape.");
        process.exit(1);
    } else if (args.length > 3) {
        console.error("Too many arguments passed, provide only one.")
    } else if (args.length === 3) {
        const url = args[2];
        const valid = /^(http|https):\/\/[^ "]+$/.test(url);
        if (valid) {
            console.log("The provided url: " + url + " appears to be valid.");
            return url;
        } else {
            console.error("The url supplied appears invalid.");
            process.exit(1);
        }
    }
}