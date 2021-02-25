# HiQ Assignment

Create simple server with a REST-style API consisting of two endpoints.

- First endpoint takes in any url as parameter and returns shortened url from which the original can be retrieved.
  - Example: https://hiqfinland.fi/avoimet-tyopaikat/ => http://localhost/agf4y0dmkgfs5xod
- Second endpoint returns the original url the from shortened version

  - Example: http://localhost/agf4y0dmkgfs5xod => https://hiqfinland.fi/avoimet-tyopaikat/

### Details and limitations:

- Shortened urls must be unique
- Length of the unique key of the second endpoint is 16 characters. Unique key is the agf4y0dmkgfs5xod part of the example url.
- Shortened url is valid for 7 days
- Do not use a data storage which requires pre-installations to the computer running the code. E.g. do not use local mysql or mongodb to store the data.
- Write proper unit tests
- You can use any programming language you like
- Add source code to your personal online git repository
- Provide HiQ access for cloning the repository
- Provide instructions of how to run the code
- Follow the instructions based on you best understanding and fill in the details as you see fit.

# Solution

## How to run?

Clone the repo:

```
git clone https://github.com/harrik123/hiq-assignment.git
```

Go to api directory:

```
cd hiq-assignment/api
```

### Install manually

```
npm install
npm run build
npm start
```

### Or with Docker

Build image:

```
docker build -t hiq-assignment .
```

Run image:

```
docker run -it -p 4000:4000 hiq-assignment
```

---

## API Endpoints

POST http://localhost:4000/v1/short-urls

Request body:

```
{
    "url": "https://hiqfinland.fi/avoimet-tyopaikat/"
}
```

Response:

```
{
    "data": {
        "shortUrl": "http://localhost:4000/v1/short-urls/:generatedKey"
    }
}
```

---

GET http://localhost:4000/v1/short-urls/:generatedKey

Response:

```
{
    "data": {
        "originalUrl": "https://hiqfinland.fi/avoimet-tyopaikat/"
    }
}
```
