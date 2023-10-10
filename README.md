<h1>🦢 Node.js Developer Technical Test - WSD 🦢</h1>

A scraper and restful API for scraping horse racing odds from Betfred. Useage of the API requires registration and authorisaiton. More on this below.

Requirements:
- Node.js
- Docker (for the database)

<h2>How to run 🏃</h2>

1. Pull the latest MongoDB image:
```docker pull mongo:latest```

2. Initilise the MongoDB container with the follwing, note that Linux users may need to prepend with 'sudo':
```docker run -d -p 27017:27017 --name=bet_db mongo:latest```

3. Create the file .env in the root of the project that contains the following key, the value is for the token signing so could be anything secure:
  - API_SECRET=abcdef123abcdef123

4. Install the project dependencies with:
```npm install```

5. Assuming the project has been cloned, build it with:
```npm run build```

6. After building, the transpiled code can be run with:
```npm run start```


<h2>How to use 🐎</h2>

1. A user must first register using the '/register' endpoint. Create a POST request to this endpoint with the following key value pairs in the body as x-www-form-urlencoded:
 - fullName: A string, may contain spaces.
 - email: Must be in a valid email format.
 - userType: Must be either 'free' or 'premium'. Note: free users do not have access to the odds endpoint.
 - password: A string.

2. The user can then login with the created registration using the '/login' endpoint. Create a POST request to this endpoint with the following key value pairs in the body as x-www-form-url-encoded:
 - email: Same as previously mentioned.
 - password: Same as previously mentioned.

3. If successful, an object with a field of 'accessToken' will be returned.  Copy this to the clipboard to make a request to the scraping endpoint.

4. Now to scrape Betfred. Create a POST request to the '/odds' endpoint. The previously aquired token needs to be added as a Header to the request with a key value pair in the following format:
  -key: Authorization
  -value: JWT [PREVIOUSLY_COPIED_KEY]

   A body must be added to the request so the system knows which event to get data from. Create a body in the request also in x-www-form-url-encoded form:
  - eventUrl: A URL of the Betfred event to scrape.
 
 If the user is premium (authorised), the event has not yet taken place and the request was successful then the API will return a JSON object containing horse names and the odds for that horse.


<h2>How to test 🧪</h2>

Run the following command to run the scrape unit test:
```npm test```
