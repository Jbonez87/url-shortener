# Url Shortener

# Installation and Instructions

1. Run `npm i` in root directory of the project

2. If you already have MongoDB installed on your machine, feel free to create a `.env` file with `MONGOURL`, `DBNAME`, `URLCOLLECTION`, `TEMP` and `PORT` variables. It should look something like this:

```
  MONGOURL=YOUR_CONNECTION_STRING
  DBNAME=YOUR_DB_NAME
  URLCOLLECTION=YOUR_COLLECTION_NAME
  PORT=YOUR_PORT
  TEMP=YOUR_BASE_URL
```

**If you do not have MongoDB installed, please install it on your machine using the following links:**
- [MongoDB For Mac](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)
- [MongoDB For Linux](https://www.mongodb.com/docs/manual/administration/install-on-linux/)
- [MongoDB For Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/) 
   
3. Run `npm run start` to build and start the server

4. Using Postman or Insomnia, send a JSON object to `localhost:3000/api/shorturl`. The JSON object should contain a `originUrl` key with the value of a valid url. Here's an example:

```JSON
{
  "originUrl": "www.example.com"
}
```

5. For ease of use, there's also a simple HTML page with a form that you can use to send requests to the **Express Server**. It's located in the `/public` directory. Try it out!

# Running the tests

The `npm t` command will run all of the jest tests and display the test coverage in your terminal.
