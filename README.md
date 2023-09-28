## Description

API to make short the long URLs


## Installation

```bash
$ npm install
```

## Running the app
### The .env file
The .env file contains:
- MONGO_URI: The connection string to mongodb
- SECRET: The secret phrase to sign the jwt token
- EXPIRATION_TIME: The duration time or the jwt token
- SALT_OR_ROUNDS: The rounds to encrypt the user passwords
  
If it was shared to you, the .env file should be copied to the root directory of the project.


```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Stay in touch

- Author - [Jonathan Gomez](https://jonathangomz.github.io)
- Website - [Shortener on Vercel](https://shortener-pi-ten.vercel.app/api/docs)

