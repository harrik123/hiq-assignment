# HiQ Assignment

## How to run?

Clone the repo:

```
git clone [insert link]
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
